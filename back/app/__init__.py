from flask_cors import CORS
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
from datetime import timedelta

socketio = SocketIO(cors_allowed_origins = "*")
bcrypt = Bcrypt()
jwt = JWTManager()

def createApp():
    app = Flask(__name__)
    CORS(app)
    bcrypt.init_app(app)
    app.config["JWT_SECRET_KEY"] = "secret_matcha_jwt_key"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=120)
    jwt.init_app(app)
    socketio.init_app(app)
    from routes.user import user_bp
    from routes.auth import auth_bp
    from routes.chat import chat_bp
    from routes.like import like_bp
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(like_bp)

    return app
