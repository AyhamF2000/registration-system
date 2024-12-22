from flask import Blueprint
from app.services.oauth_service import handle_google_auth, handle_facebook_auth

# Define a Blueprint for authentication-related routes
auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route('/google', methods=['GET'])
async def google_login():
    """
    Redirects to Google's OAuth login page.

    Returns:
        Redirect: URL for Google login.
    """
    return await handle_google_auth()

@auth_bp.route('/google/callback', methods=['GET'])
async def google_callback():
    """
    Handles Google's OAuth callback.

    Returns:
        Redirect or JSON: Redirects to frontend with user info or error.
    """
    return await handle_google_auth(callback=True)

@auth_bp.route('/facebook', methods=['GET'])
def facebook_login():
    """
    Redirects to Facebook's OAuth login page.

    Returns:
        Redirect: URL for Facebook login.
    """
    return handle_facebook_auth()

@auth_bp.route('/facebook/callback', methods=['GET'])
async def facebook_callback():
    """
    Handles Facebook's OAuth callback.

    Returns:
        Redirect or JSON: Redirects to frontend with user info or error.
    """
    return await handle_facebook_auth(callback=True)
