import base64
from flask import request, jsonify
from database_utils.requests import *
from flask_jwt_extended import create_access_token, decode_token
from app import bcrypt
import re

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def isEmailValid(email):
    if re.fullmatch(regex, email):
      print("Valid email")
    else:
      print("Invalid email")


def signin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        return ("Username is invalid!", 401)
    if (len(password) < 8 or len(password) > 20):
        return ("Password is invalid!", 401)
    
    response = makeRequest("SELECT pass FROM user WHERE username = ?", (str(username),))

    if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
        return jsonify({"msg": "Bad username or password"}), 401
    result = makeRequest("SELECT user.id, username, first_name, last_name FROM user WHERE username = ?", (str(username),))
    user = result[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
    user["images"] = decodeImages(images)
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        return ("Username is invalid!", 401)
    if (len(password) < 8 or len(password) > 20):
        return ("Password is invalid!", 401)
    email = request.json.get("email", None)
    if (not isEmailValid(email)):
        return ("Email is invalid!", 401)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    birth_date = request.json.get("birth_date", None)
    response = makeRequest("INSERT INTO user (username, pass, email, first_name, last_name, birth_date) VALUES (?, ?, ?, ?, ?, ?)",
                           (str(username), bcrypt.generate_password_hash(password), str(email), str(first_name), str(last_name), str(birth_date)))
    result = makeRequest("SELECT user.id, username, first_name, last_name FROM user WHERE username = ?", (str(username),))
    user = result[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
    user["images"] = decodeImages(images)
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

def getAuth():
    try :
        token = request.args.get("jwt_token", None)
        data = decode_token(token)
        user_id = data["sub"]
        result = makeRequest("SELECT user.id, username FROM user WHERE user.id = ?", (str(user_id),))
        user = result[0]
        images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
        user["images"] = decodeImages(images)
        return jsonify(user=user)
    except :
        return ("Token is invalid!", 401)
