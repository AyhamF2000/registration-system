from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from pymongo.server_api import ServerApi
from bson import ObjectId
from datetime import datetime
from password_strength import PasswordPolicy
import bcrypt
from app.services.node_service import call_node_server
from config import Config

# Define password policy
policy = PasswordPolicy.from_names(length=8, uppercase=1, numbers=1, special=1, nonletters=0)
db = None

def init_db(app):
    """
    Initializes the MongoDB database connection.

    Args:
        app (Flask): Flask application instance.
    """
    global db
    try:
        client = MongoClient(Config.MONGO_URI, server_api=ServerApi('1'))
        client.admin.command('ping')  # Test connection
        app.logger.info("Connected to MongoDB successfully!")
        db = client[Config.MONGO_DB_NAME]
    except ServerSelectionTimeoutError as e:
        app.logger.error(f"MongoDB connection failed: {e}")
        exit(1)

def hash_password(password):
    """Hashes a plain-text password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password, hashed_password):
    """Verifies if a plain-text password matches its bcrypt hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def validate_password(password):
    """Checks if a password meets the required complexity policy."""
    return not policy.test(password)

def find_or_create_user(email, name, source):
    """
    Finds an existing user or creates a new one.

    Args:
        email (str): User's email address.
        name (str): User's name.
        source (str): Registration source (e.g., 'Google', 'Facebook').

    Returns:
        tuple: (message, is_new_user).
    """
    user = db.users.find_one({"email": email, "source": source})
    if not user:
        user_data = {
            "_id": str(ObjectId()),
            "email": email,
            "name": name,
            "source": source,
            "created_at": datetime.now()
        }
        db.users.insert_one(user_data)
        return "User registered successfully.", True
    return "User logged in successfully.", False

async def register_user(data):
    """
    Registers a new user into the system.

    Args:
        data (dict): Registration details (email, password, name).

    Returns:
        dict: Response with success or error message.
    """
    if not data.get('email') or not data.get('password'):
        return {"success": False, "message": "Email and password are required.", "status": 400}

    if db.users.find_one({"email": data['email'], "source": "App"}):
        return {"success": False, "message": "Email already registered.", "status": 409}

    if not validate_password(data['password']):
        return {"success": False, "message": "Password does not meet complexity requirements.", "status": 400}

    hashed_password = hash_password(data['password'])
    user_data = {
        "_id": str(ObjectId()),
        "email": data['email'],
        "name": data.get("name", "User"),
        "source": "App",
        "password": hashed_password,
        "created_at": datetime.now()
    }
    db.users.insert_one(user_data)

    welcome_message = await call_node_server(f"Welcome {user_data['name']} to Elysian Softech!")
    return {"success": True, "message": "Registration successful.", "name": user_data["name"], "email": user_data["email"], "welcome_message": welcome_message}

async def login_user(data):
    """
    Authenticates an existing user.

    Args:
        data (dict): Login details (email, password).

    Returns:
        dict: Response with success or error message.
    """
    user = db.users.find_one({"email": data['email'], "source": "App"})
    if user and verify_password(data['password'], user['password']):
        welcome_message = await call_node_server(f"Welcome back, {user['name']}! Here’s a random programming fact.")
        return {"success": True, "message": "Login successful.", "name": user["name"], "email": user["email"], "welcome_message": welcome_message}
    return {"success": False, "message": "Invalid email or password.", "status": 401}

def change_user_password(data):
    """
    Changes a user's password.

    Args:
        data (dict): Password change details (email, current_password, new_password).

    Returns:
        dict: Response with success or error message.
    """
    user = db.users.find_one({"email": data['email'], "source": "App"})
    if not user or not verify_password(data['current_password'], user['password']):
        return {"success": False, "message": "Invalid credentials.", "status": 401}

    if not validate_password(data['new_password']):
        return {"success": False, "message": "Password does not meet complexity requirements.", "status": 400}

    hashed_password = hash_password(data['new_password'])
    db.users.update_one({"email": data['email'], "source": "App"}, {"$set": {"password": hashed_password}})
    return {"success": True, "message": "Password changed successfully."}
