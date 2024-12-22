from flask import Blueprint, jsonify

# Define a Blueprint for the root route
index_bp = Blueprint("index", __name__)

@index_bp.route("/")
def index():
    """
    Root route for the application.
    """
    services = {
        "Login": "/user/login",
        "Register": "/user/register",
        "Change Password": "/user/change-password",
        "Google OAuth": "/auth/google",
        "Facebook OAuth": "/auth/facebook   (Unavailable now)"
    }
    
    message = {
        "welcome_message": "Welcome to Ayham Farhat's API!",
        "about": "This project showcases my skills in backend development as part of my journey to join Elysian Softech.",
        "services": services,
        "note": "Feel free to test the listed services and explore the functionality.",
        "contact": "For any inquiries, reach out to me at ayham.af1@gmail.com"
    }
    
    return jsonify(message)
