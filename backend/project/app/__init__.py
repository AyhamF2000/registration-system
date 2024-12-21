from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from app.services.user_service import init_db
import logging
from config import Config

def create_app():
    """
    Factory function for creating and configuring the Flask app.

    Returns:
        Flask: Configured Flask application instance.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    CORS(app, resources={r"/*": {"origins": "*"}})
    limiter = Limiter(get_remote_address, app=app, default_limits=["200 per day", "50 per hour"])

    # Setup logging
    logging.basicConfig(level=logging.INFO)
    app.logger.info("Application starting...")

    # Initialize database
    init_db(app)

    # Register blueprints
    from app.routes.user import user_bp
    from app.routes.auth import auth_bp
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)

    return app
