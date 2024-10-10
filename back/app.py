from database_utils.decoratorFunctions import token_required
from flask_bcrypt import Bcrypt
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from database_utils.requests import *

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import decode_token

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "secret_matcha_jwt_key"
jwt = JWTManager(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/easteregg")
def easteregg():
    return "<p>Congrats! You found the easteregg!</p>"

@app.route("/profile/", methods = ["GET"])
@token_required
def getProfiles(user_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating FROM user")
    return response

@app.route("/profile/<int:profile_id>", methods = ["GET"])
@token_required
def getProfileById(user_id, profile_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating FROM user WHERE id = ?", (str(profile_id)))
    # We send back [0] because we get a table with a single element
    return response

@app.route("/profile/view_history", methods = ["GET"])
@token_required
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id)))
    return response

@app.route("/profile/settings", methods = ["GET"])
@token_required
def getSettings(user_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio FROM user WHERE id = ?", (str(user_id)))
    # We send back [0] because we get a table with a single element
    return response[0]

@app.route("/notifications", methods = ["GET"])
@token_required
def getNotifications(user_id):
    response = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = ?", (str(user_id)))
    return response

@app.route("/signin", methods = ["POST"])
def signin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    response = makeRequest("SELECT pass FROM user WHERE username = ?", (str(username),))

    if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
        return jsonify({"msg": "Bad username or password"}), 401
    result = makeRequest("SELECT user.id, username, first_name, last_name, image_file AS profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE username = ?", (str(username),))
    user = result[0]
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

@app.route("/signup", methods = ["POST"])
def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    response = makeRequest("INSERT INTO user (username, pass, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
                           (str(username), bcrypt.generate_password_hash(password), str(email), str(first_name), str(last_name)))

    # if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
    #     return jsonify({"msg": "Bad username or password"}), 401
    result = makeRequest("SELECT user.id, username, first_name, last_name, image_file AS profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE username = ?", (str(username),))
    user = result[0]
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

@app.route("/chat/<int:chatter_id>", methods = ["GET"])
@token_required
def getChatById(user_id, chatter_id):
    chatter = makeRequest("SELECT id, first_name, last_name FROM user WHERE id = ?", (str(chatter_id)))
    messages = makeRequest("SELECT id, sender_id, receiver_id, created_at FROM message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC",
                           ((str(user_id)), (str(chatter_id)), (str(chatter_id)), (str(user_id))))
    return jsonify(chatter=chatter,messages=messages)

@app.route("/auth", methods = ["GET"])
def getAuth():
    token = request.args.get("jwt_token", None)
    data = decode_token(token)
    user_id = data["sub"]
    result = makeRequest("SELECT user.id, username, image_file AS profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE user.id = ?", (str(user_id),))
    user = result[0]
    return jsonify(user=user)