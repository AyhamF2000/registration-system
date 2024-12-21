import httpx
from flask import request, redirect
from app.services.user_service import find_or_create_user
from config import Config
from app.services.user_service import call_node_server
async def handle_google_auth(callback=False):
    """
    Handles Google OAuth login and callback.

    Args:
        callback (bool): Whether it is the callback request.

    Returns:
        Redirect or JSON: URL redirection or user info.
    """
    if not callback:
        # Redirect to Google login
        google_params = {
            "client_id": Config.GOOGLE_CLIENT_ID,
            "redirect_uri": f"{Config.REDIRECT_URI}/google/callback",
            "response_type": "code",
            "scope": "openid email profile",
        }
        return redirect(f"https://accounts.google.com/o/oauth2/auth?{httpx.QueryParams(google_params)}")

    # Handle callback
    code = request.args.get("code")
    if not code:
        return {"success": False, "message": "Authorization code not provided"}, 400

    async with httpx.AsyncClient() as client:
        # Exchange code for access token
        token_data = {
            "code": code,
            "client_id": Config.GOOGLE_CLIENT_ID,
            "client_secret": Config.GOOGLE_CLIENT_SECRET,
            "redirect_uri": f"{Config.REDIRECT_URI}/google/callback",
            "grant_type": "authorization_code",
        }
        token_response = await client.post("https://oauth2.googleapis.com/token", data=token_data)
        token_json = token_response.json()
        access_token = token_json.get("access_token")

        # Fetch user info
        user_info = await client.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        user_json = user_info.json()

        email = user_json.get("email")
        name = user_json.get("name")
        if email:
            message, is_new_user = find_or_create_user(email, name, "Google")
            if is_new_user:
                welcome_message = await call_node_server(f"Welcome {name} to Elysian Softech!")
                return redirect(f"{Config.FRONTEND_URL}/welcome?name={name}&email={email}&message={message}&welcome_message={welcome_message}")
            else:
                return redirect(f"{Config.FRONTEND_URL}/welcome?name={name}&email={email}")

    return {"success": False, "message": "Failed to fetch user info"}, 400

async def handle_facebook_auth(callback=False):
    """
    Handles Facebook OAuth login and callback.

    Args:
        callback (bool): Whether it is the callback request.

    Returns:
        Redirect or JSON: URL redirection or user info.
    """
    if not callback:
        # Redirect to Facebook login
        facebook_params = {
            "client_id": Config.FACEBOOK_APP_ID,
            "redirect_uri": f"{Config.REDIRECT_URI}/facebook/callback",
            "response_type": "code",
            "scope": "email",
        }
        return redirect(f"https://www.facebook.com/v10.0/dialog/oauth?{httpx.QueryParams(facebook_params)}")

    # Handle callback
    code = request.args.get("code")
    if not code:
        return {"success": False, "message": "Authorization code not provided"}, 400

    async with httpx.AsyncClient() as client:
        # Exchange code for access token
        token_data = {
            "client_id": Config.FACEBOOK_APP_ID,
            "redirect_uri": f"{Config.REDIRECT_URI}/facebook/callback",
            "client_secret": Config.FACEBOOK_APP_SECRET,
            "code": code,
        }
        token_response = await client.get("https://graph.facebook.com/v10.0/oauth/access_token", params=token_data)
        token_json = token_response.json()
        access_token = token_json.get("access_token")

        # Fetch user info
        user_info = await client.get(
            "https://graph.facebook.com/me",
            params={"access_token": access_token, "fields": "id,email,name"},
        )
        user_json = user_info.json()

        email = user_json.get("email")
        name = user_json.get("name")
        if email:
            message, _ = find_or_create_user(email, name, "Facebook")
            return redirect(f"{Config.FRONTEND_URL}/welcome?name={name}&email={email}&message={message}")

    return {"success": False, "message": "Failed to fetch user info"}, 400
