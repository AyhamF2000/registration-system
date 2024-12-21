import datetime
from flask import Flask, request, jsonify, redirect
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bcrypt
from password_strength import PasswordPolicy
from dotenv import load_dotenv
import os
import requests
from flask_cors import CORS
from bson import ObjectId
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import httpx

# Load environment variables from .env file
load_dotenv()

# Constants
FRONTEND_URL = "http://localhost:5173"
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
FACEBOOK_APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
REDIRECT_URI = "http://127.0.0.1:5000/auth"

# OAuth URLs
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo"
FACEBOOK_AUTH_URL = "https://www.facebook.com/v10.0/dialog/oauth"
FACEBOOK_TOKEN_URL = "https://graph.facebook.com/v10.0/oauth/access_token"
FACEBOOK_USERINFO_URL = "https://graph.facebook.com/me?fields=id,email,name"
NODE_SERVER_URL = "http://127.0.0.1:3000/message"

# Flask app configuration
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": FRONTEND_URL}})

# Rate limiter setup
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

# MongoDB setup
try:
    client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
    client.admin.command('ping')  # Confirm connection
    print("Connected to MongoDB successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)
    exit(1)

db = client[MONGO_DB_NAME]

# Password policy
policy = PasswordPolicy.from_names(length=8, uppercase=1, numbers=1, special=1, nonletters=0)

# Helper functions


def hash_password(password):
    """Hashes a password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def verify_password(password, hashed_password):
    """Verifies a password against its hashed equivalent."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)


def validate_registration_data(data):
    """
    Validates registration data based on the password policy.
    
    Args:
        data (dict): The registration data containing email and password.

    Returns:
        tuple: A boolean indicating validity and an error message (if invalid).
    """
    if not data.get('email') or not data.get('password'):
        return False, "Email and password are required."
    if not isinstance(data['email'], str) or not isinstance(data['password'], str):
        return False, "Invalid input types."
    password = data['password']
    issues = policy.test(password)
    if issues:
        return False, "Password does not meet complexity requirements."
    return True, ""


def find_or_create_user(email, name, source):
    """
    Finds an existing user or creates a new one in the database.
    
    Args:
        email (str): User's email address.
        name (str): User's name.
        source (str): The source of registration (e.g., Google, Facebook).

    Returns:
        tuple: A message and a boolean indicating if the user is new.
    """
    source = source.lower()  # Ensure consistency in source
    user = db.users.find_one({"email": email, "source": source})  # Query using the standardized source
    if not user:
        user_data = {
            "_id": str(ObjectId()),
            "email": email,
            "name": name,
            "source": source,  # Save the standardized source
            "created_at": datetime.datetime.now()
        }
        db.users.insert_one(user_data)
        return "User registered successfully.", True  # User is new
    return "User logged in successfully.", False  # User already exists



@app.route('/register', methods=['POST'])
@limiter.limit("5 per minute")
async def register():
    """
    Registers a new user.

    Validates registration data, hashes the password, and saves the user to the database.
    """
    data = request.json
    is_valid, message = validate_registration_data(data)
    if not is_valid:
        return jsonify({"success": False, "message": message}), 400

    if db.users.find_one({"email": data['email'], "source": "App"}):
        return jsonify({"success": False, "message": "Email already registered."}), 409

    hashed_password = hash_password(data['password'])
    user_data = {
        "_id": str(ObjectId()),
        "email": data['email'],
        "name": data.get("name", "User"),
        "source": "App",
        "password": hashed_password,
        "created_at": datetime.datetime.now()
    }
    db.users.insert_one(user_data)

    prompt =f"Write a friendly one-sentence welcome message for {user_data['name']} introducing Elysian Softech (https://elysian-softech.com/)."
    welcome_message = await call_node_server(prompt)

    return jsonify({
        "success": True,
        "message": "Registration successful.",
        "name": user_data["name"],
        "email": user_data["email"],
        "welcome_message": welcome_message
    }), 201


@app.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
async def login():
    """
    Authenticates a user.

    Verifies the email and password and returns a success message with user details if valid.
    """
    data = request.json
    if not data.get('email') or not data.get('password'):
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = db.users.find_one({"email": data['email'],"source": "App"})
    if user and verify_password(data['password'], user['password']):

        prompt =f"Say hi to {user['name']} and share a random programming fact."
        welcome_message = await call_node_server(prompt)

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "name": user.get("name"),
            "email": user.get("email"),
            "welcome_message": welcome_message
        }), 200

    return jsonify({"success": False, "message": "Invalid email or password."}), 401


@app.route('/change-password', methods=['POST'])
def change_password():
    """
    Allows users to change their password.

    Validates the current password and updates it to the new password if valid.
    """
    data = request.json

    # Validate input data
    email = data.get('email')
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    if not email or not current_password or not new_password:
        return jsonify({"success": False, "message": "Email, current password, and new password are required."}), 400

    # Retrieve user by email
    user = db.users.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    # Verify the current password
    if not bcrypt.checkpw(current_password.encode('utf-8'), user['password']):
        return jsonify({"success": False, "message": "Current password is incorrect."}), 401

    # Validate the new password
    issues = policy.test(new_password)
    if issues:
        return jsonify({"success": False, "message": "New password does not meet complexity requirements."}), 400

    # Update the password in the database
    hashed_new_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    db.users.update_one({"email": email}, {"$set": {"password": hashed_new_password}})

    return jsonify({"success": True, "message": "Password changed successfully."}), 200


@app.route('/auth/google', methods=['GET'])
def google_login():
    """
    Redirects to Google's OAuth login page.
    """
    google_params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": f"{REDIRECT_URI}/google/callback",
        "response_type": "code",
        "scope": "openid email profile",
    }
    google_url = f"{GOOGLE_AUTH_URL}?{requests.compat.urlencode(google_params)}"
    return redirect(google_url)


@app.route('/auth/google/callback', methods=['GET'])
async def google_callback():
    """
    Handles Google's OAuth callback.

    Exchanges the authorization code for an access token and retrieves user info.
    """
    code = request.args.get("code")
    if not code:
        return jsonify({"success": False, "message": "Authorization code not provided"}), 400

    token_data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": f"{REDIRECT_URI}/google/callback",
        "grant_type": "authorization_code",
    }
    token_response = requests.post(GOOGLE_TOKEN_URL, data=token_data).json()
    access_token = token_response.get("access_token")

    user_info = requests.get(
        GOOGLE_USERINFO_URL,
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    email = user_info.get("email")
    name = user_info.get("name")

    if email:
        # Find or create the user and check if the user is new
        message, is_new_user = find_or_create_user(email, name, "Google")
        
        # Generate the OpenAI welcome message only if the user is new
        welcome_message = (
            await call_node_server(f"Write a friendly one-sentence welcome message for {name} introducing Elysian Softech (https://elysian-softech.com/).")
            if is_new_user else
            await call_node_server(f"Say hi to {name} and share a random programming fact.")
        )
        
        return redirect(
            f"{FRONTEND_URL}/welcome?name={requests.utils.quote(name)}&email={requests.utils.quote(email)}&welcome_message={requests.utils.quote(welcome_message)}"
        )
# import jwt

# token = jwt.encode({"name": name, "email": email, "welcome_message": welcome_message}, 'secret_key', algorithm='HS256')
# redirect_url = f"{FRONTEND_URL}/welcome?token={token}"


    return jsonify({"success": False, "message": "Failed to fetch user info"}), 400



@app.route('/auth/facebook', methods=['GET'])
def facebook_login():
    """
    Redirects to Facebook's OAuth login page.
    """
    facebook_params = {
        "client_id": FACEBOOK_APP_ID,
        "redirect_uri": f"{REDIRECT_URI}/facebook/callback",
        "response_type": "code",
        "scope": "email",
    }
    facebook_url = f"{FACEBOOK_AUTH_URL}?{requests.compat.urlencode(facebook_params)}"
    return redirect(facebook_url)


@app.route('/auth/facebook/callback', methods=['GET'])
async def facebook_callback():
    """
    Handles Facebook's OAuth callback.

    Exchanges the authorization code for an access token and retrieves user info.
    """
    code = request.args.get("code")
    if not code:
        return jsonify({"success": False, "message": "Authorization code not provided"}), 400

    token_data = {
        "client_id": FACEBOOK_APP_ID,
        "redirect_uri": f"{REDIRECT_URI}/facebook/callback",
        "client_secret": FACEBOOK_APP_SECRET,
        "code": code,
    }
    token_response = requests.get(FACEBOOK_TOKEN_URL, params=token_data).json()
    access_token = token_response.get("access_token")

    user_info = requests.get(FACEBOOK_USERINFO_URL, params={"access_token": access_token}).json()
    email = user_info.get("email")
    name = user_info.get("name")

    if email:
        find_or_create_user(email, name, "Facebook")
        return redirect(f"{FRONTEND_URL}/welcome?name={name}&email={email}")

    return jsonify({"success": False, "message": "Failed to fetch user info"}), 400


async def call_node_server(prompt):
    """
    Calls the Node.js server asynchronously to generate a custom message.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(NODE_SERVER_URL, json={"prompt": prompt}, timeout=10)
            if response.status_code == 200:
                return response.json().get("message", "Welcome to Elysian Softech!")
            else:
                print("Node server error:", response.text)  # Log error response
    except Exception as e:
        print("Error fetching message from Node server:", e)
    return "Welcome to Elysian Softech!"



if __name__ == '__main__':
    app.run(debug=True)
