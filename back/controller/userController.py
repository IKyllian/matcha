from flask import jsonify, request
from database_utils.decoratorFunctions import token_required
from database_utils.requests import *
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, decode_token

def getAgeFromTime(SqlTime):
    current_time = datetime.now()
    age = current_time - datetime.strptime(SqlTime, '%Y-%m-%d')
    return int(divmod(age.total_seconds(), 31536000)[0])

@token_required
def getProfiles(user_id):
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating FROM user")
    return response

@token_required
def getProfileById(user_id, profile_id):
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date FROM user WHERE id = ?", (str(profile_id),))
    user = response[0]
    user["age"] = getAgeFromTime(user["birth_date"])
    del user["birth_date"]
    if (user_id == profile_id):
        return jsonify(user=user)
    like = makeRequest("SELECT id FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(profile_id),))
    block = makeRequest("SELECT id FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(profile_id),))
    return jsonify(user=user, like=(len(like) > 0), block=(len(block) > 0))

@token_required
def getSettings(user_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, birth_date FROM user WHERE id = ?", (str(user_id)))
    user = response[0]
    return jsonify(user=user)

def checkImages(images):
    if (len(images) > 5):
        return False
    profilePicCount = 0
    for image in images:
        if (image["is_profile_picture"] == True):
            profilePicCount += 1
    if profilePicCount != 1:
        return False
    return True

@token_required
def setSettings(user_id):
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    birth_date = request.json.get("birth_date", None)
    gender = request.json.get("gender", None)
    sexual_preference = request.json.get("sexual_preference", None)
    bio = request.json.get("bio", None)
    images = request.json.get("images", None)
    if (not checkImages(images)):
        return ("Invalid images sent", 403)
    
    #First we insert all the data we got from settings
    makeRequest("INSERT INTO user (username, email, first_name, last_name, birth_date, gender, sexual_preference, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                           (str(username), str(email), str(first_name), str(last_name), str(birth_date), str(gender), str(sexual_preference), str(bio)))
    #Then we go through every images sent, and save them in the database
    for image in images:
        makeRequest("INSERT INTO image (image_file, user_id, is_profile_picture) VALUES (?, ?, ?)",
                    (str(image["file"]), str(user_id), str(image["is_profile_picture"])))

    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, birth_date FROM user WHERE id = ?", (str(user_id)))
    user = response[0]
    return jsonify(user=user)

@token_required
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id)))
    return jsonify(history=response)

@token_required
def getNotifications(user_id):
    response = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = ?", (str(user_id)))
    return response