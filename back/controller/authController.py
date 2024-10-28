from flask import request, jsonify
from database_utils.requests import *
from flask_jwt_extended import create_access_token, decode_token
from app import bcrypt

def signin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        return (jsonify({"message": "Username is invalid!"}))
    if (len(password) < 8 or len(password) > 20):
        return (jsonify({"message": "Password is invalid!"}))
    
    response = makeRequest("SELECT pass FROM user WHERE username = ?", (str(username),))

    if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
        return jsonify({"msg": "Bad username or password"}), 401
    result = makeRequest("SELECT user.id, username, first_name, last_name, image_file AS profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE username = ?", (str(username),))
    user = result[0]
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    birth_date = request.json.get("birth_date", None)
    response = makeRequest("INSERT INTO user (username, pass, email, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?, ?)",
                           (str(username), bcrypt.generate_password_hash(password), str(email), str(first_name), str(last_name), str(birth_date)))

    # if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
    #     return jsonify({"msg": "Bad username or password"}), 401
    result = makeRequest("SELECT user.id, username, first_name, last_name, image_file AS profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE username = ?", (str(username),))
    user = result[0]
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

def getAuth():
    token = request.args.get("jwt_token", None)
    data = decode_token(token)
    user_id = data["sub"]
    result = makeRequest("SELECT user.id, username, image_file AS profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE user.id = ?", (str(user_id),))
    user = result[0]
    return jsonify(user=user)