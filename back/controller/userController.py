from flask import jsonify, request
from database_utils.decoratorFunctions import token_required
from database_utils.requests import *
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, decode_token

@token_required
def getProfiles(user_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating FROM user")
    return response

@token_required
def getProfileById(user_id, profile_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating FROM user WHERE id = ?", (str(profile_id)))
    # We send back [0] because we get a table with a single element
    return jsonify(user=response[0])

@token_required
def getSettings(user_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio FROM user WHERE id = ?", (str(user_id)))
    # We send back [0] because we get a table with a single element
    return response[0]

@token_required
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id)))
    return jsonify(history=response)

@token_required
def getNotifications(user_id):
    response = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = ?", (str(user_id)))
    return response