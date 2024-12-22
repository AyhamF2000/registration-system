import httpx
from config import Config

async def call_node_server(prompt):
    """
    Calls the Node.js server to generate a custom message.

    Args:
        prompt (str): The input prompt for the Node.js server.

    Returns:
        str: The generated message or a fallback message.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(Config.NODE_SERVER_URL, json={"prompt": prompt}, timeout=10)
            if response.status_code == 200:
                return response.json().get("message", "Welcome to Elysian Softech!")
    except Exception as e:
        print(f"Node server error: {e}")
    return "Welcome to Elysian Softech!"
