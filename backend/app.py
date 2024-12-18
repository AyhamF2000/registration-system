from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bcrypt
from password_strength import PasswordPolicy
from dotenv import load_dotenv
import os
import requests  # For making HTTP requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# MongoDB connection string
uri = os.getenv("MONGO_URI")

# Establish MongoDB client and verify connection
try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')  # Confirm connection
    print("Connected to MongoDB successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)
    exit(1)  # Terminate if connection fails

# Access the specified database
db = client[os.getenv("MONGO_DB_NAME")]

# Password policy configuration
policy = PasswordPolicy.from_names(
    length=8,         # Minimum length
    uppercase=1,      # At least one uppercase letter
    numbers=1,        # At least one digit
    special=1,        # At least one special character
    nonletters=0      # No additional requirements
)

# Node.js server URL
NODE_SERVER_URL = os.getenv("NODE_SERVER_URL", "http://localhost:3000/message")

# Helper function to validate user input
def validate_registration_data(data):
    if not data.get('email') or not data.get('password'):
        return False, "Email and password are required."
    
    password = data['password']
    issues = policy.test(password)
    if issues:
        return False, "Password does not meet complexity requirements: " + ", ".join(str(issue) for issue in issues)

    return True, ""

@app.route('/register', methods=['POST'])
def register():
    """Endpoint to register a new user."""
    data = request.json

    # Validate input data
    is_valid, message = validate_registration_data(data)
    if not is_valid:
        return jsonify({"success": False, "message": message}), 400

    # Check if the email is already registered
    if db.users.find_one({"email": data['email']}):
        return jsonify({"success": False, "message": "Email already registered."}), 409

    # Hash the user's password
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Save the new user to the database
    db.users.insert_one({"email": data['email'], "password": hashed_password})

    # Fetch a message from the Node.js server
    try:
        response = requests.post(NODE_SERVER_URL, json={"prompt": "Welcome new user!"})
        response.raise_for_status()  # Raise exception for HTTP errors
        message = response.json().get("message", "Welcome to the platform!")
    except requests.RequestException as e:
        print(f"Error communicating with Node.js server: {e}")
        message = "Registration successful, but could not fetch welcome message."

    return jsonify({"success": True, "message": message}), 201

@app.route('/login', methods=['POST'])
def login():
    """Endpoint to authenticate an existing user."""
    data = request.json

    # Validate input data
    if not data.get('email') or not data.get('password'):
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    # Retrieve user by email
    user = db.users.find_one({"email": data['email']})
    if user:
        # Verify the provided password
        if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            return jsonify({"success": True, "message": "Login successful."})
    
    return jsonify({"success": False, "message": "Invalid email or password."}), 401

if __name__ == '__main__':
    app.run(debug=True)
