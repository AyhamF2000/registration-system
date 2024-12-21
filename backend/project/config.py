import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """
    Configuration settings for the Flask app.
    Reads sensitive information from environment variables.
    """
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
    FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
    FACEBOOK_APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
    REDIRECT_URI = os.getenv("REDIRECT_URI", "http://127.0.0.1:5000/auth")
    NODE_SERVER_URL = os.getenv("NODE_SERVER_URL", "http://127.0.0.1:3000/message")
