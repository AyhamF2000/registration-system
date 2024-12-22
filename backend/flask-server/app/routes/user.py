from flask import Blueprint, request, jsonify
from app.services.user_service import register_user, login_user, change_user_password

# Define a Blueprint for user-related routes
user_bp = Blueprint("user", __name__, url_prefix="/user")

@user_bp.route('/register', methods=['POST'])
async def register():
    """
    Registers a new user.

    Request Body:
        - email (str): User's email.
        - password (str): User's password.
        - name (str, optional): User's name.

    Returns:
        JSON: Success message or error.
    """
    data = request.json
    response = await register_user(data)
    return jsonify(response), response.get("status", 200)

@user_bp.route('/login', methods=['POST'])
async def login():
    """
    Logs in an existing user.

    Request Body:
        - email (str): User's email.
        - password (str): User's password.

    Returns:
        JSON: Success message or error.
    """
    data = request.json
    response = await login_user(data)
    return jsonify(response), response.get("status", 200)

@user_bp.route('/change-password', methods=['POST'])
def change_password():
    """
    Changes the password for an existing user.

    Request Body:
        - email (str): User's email.
        - current_password (str): Current password.
        - new_password (str): New password.

    Returns:
        JSON: Success or error message.
    """
    data = request.json
    response = change_user_password(data)
    return jsonify(response), response.get("status", 200)
