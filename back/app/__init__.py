from flask_cors import CORS
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
from datetime import timedelta
from flask import jsonify
from errors.httpErrors import APIError

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
    from routes.block import block_bp
    from routes.view import view_bp
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(like_bp)
    app.register_blueprint(block_bp)
    app.register_blueprint(view_bp)
    
    @app.errorhandler(APIError)
    def handle_exception(err):
        """Return custom JSON when APIError or its children are raised"""
        print("err", err)
        print("err", err.code)
        print("err", err.args)
        print("err", err.description)
        response = {"error": err.description, "message": "", 'code': err.code, 'description': err.description}
        if len(err.args) > 0:
            response["message"] = err.args[0]
        return jsonify(response), err.code

    return app
