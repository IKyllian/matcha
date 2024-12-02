from flask import request, jsonify
import hashlib
from controller.notifController import getAllNotifs
from services.user import getUserWithProfilePictureById, getUserWithProfilePictureByUsername
from decorators.dataDecorator import validate_request
from database_utils.requests import *
from flask_jwt_extended import create_access_token, decode_token
from app import bcrypt
from errors.httpErrors import APIAuthError, NotFoundError
import re
import ipdata
import os

@validate_request({
    "username": {"required": True, "type": str, "min": 3, "max": 20, "isalnum": True},
    "password": {"required": True, "type": str},
})
def signin(validated_data):
    fields = ["username", "password"]
    username, password = (validated_data[key] for key in fields)
    
    response = makeRequest("SELECT pass FROM user WHERE username = ?", (str(username),))
    if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
        raise APIAuthError("Mauvais nom d'utilisateur ou mot de passe")
    user = getUserWithProfilePictureByUsername(username)
    access_token = create_access_token(identity=user["id"])
    notifications = getAllNotifs(user["id"])
    return jsonify(access_token=access_token, user=user, notifications=notifications)

@validate_request({
    "username": {"required": True, "type": str, "min": 3, "max": 20, "isalnum": True},
    "first_name": {"required": True, "type": str, "min": 2, "max": 35, "isalpha": True},
    "last_name": {"required": True, "type": str, "min": 2, "max": 35, "isalpha": True},
    "email": {"required": True, "type": str, "regex": r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'},
    "password": {"required": True, "type": str, "min": 8},
    "birth_date": {"required": True, "type": str, "date_format": "%Y-%m-%d"}
})
def signup(validated_data):
    fields = ["username", "password", "email", "first_name", "last_name", "birth_date"]
    username, password, email, first_name, last_name, birth_date = (validated_data[key] for key in fields)
    
    usernameUsed = makeRequest("SELECT COUNT(*) AS count FROM user WHERE username = :username", (str(username),))
    if (int(usernameUsed[0]["count"]) > 0):
        raise APIAuthError("Le nom d'utilisateur est deja utilisee")
    emailUsed = makeRequest("SELECT COUNT(*) AS count FROM user WHERE email = :email", (str(email),))
    if (int(emailUsed[0]["count"]) > 0):
        raise APIAuthError("L'email est deja utilisee")

    ipdata.api_key = os.getenv("IP_DATA_API_KEY")
    try :
        ipAddress = get_client_ip()
        if ('10.11.' in ipAddress or '127.0.'in ipAddress):
            ipAddress = os.getenv("PUBLIC_IP")
        data = ipdata.lookup(ipAddress)
        user_id = makeInsertRequest("INSERT INTO user (username, pass, email, first_name, last_name, birth_date, fame_rating, latitude, longitude, is_activated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            (str(username), bcrypt.generate_password_hash(password).decode("utf8"), str(email), str(first_name), str(last_name), str(birth_date), str(2.5), str(data['latitude']), str(data['longitude']), str(0)))
    except :
        raise APIAuthError('Location est invalide')
    dataToEncode = (str(user_id) + str(os.urandom(16)))
    urlIdentifier = hashlib.sha256(dataToEncode.encode()).hexdigest()
    makeRequest("UPDATE user SET url_identifier = ? WHERE id = ?", ((str(urlIdentifier)), (str(user_id))))
    send_email_auth(email, urlIdentifier)
    return jsonify(ok=True)

def getAuth():
    try :
        token = request.args.get("jwt_token", None)
        data = decode_token(token)
        user_id = data["sub"]
        user = getUserWithProfilePictureById(user_id)
        notifications = getAllNotifs(user_id)
        return jsonify(user=user, notifications=notifications)
    except :
        raise APIAuthError('Token invalide')

def activateAccount():
    urlIdentifier = request.json.get("url_identifier", None)
    response = makeRequest("SELECT id FROM user WHERE url_identifier = ?", (urlIdentifier,))
    if (not response):
        raise NotFoundError("No matching account found with the provided urlIdentifier")
    makeRequest("UPDATE user SET is_activated = ?, url_identifier = NULL WHERE id = ?", (str(1), str(response[0]["id"])))
              
    return jsonify(ok=True, message="Account activated successfully")

def sendResetPassword():
    email = request.json.get("email", None)
    response = makeRequest("SELECT id FROM user WHERE email = ?", (email,))
    user_id = response[0]["id"]
    dataToEncode = (str(user_id) + str(os.urandom(16)))
    urlIdentifier = hashlib.sha256(dataToEncode.encode()).hexdigest()
    makeRequest("UPDATE user SET url_identifier = ? WHERE id = ?", ((str(urlIdentifier)), (str(user_id))))
    send_email_password(email, urlIdentifier)
    return jsonify(ok=True, message="Account activated successfully")
    
def resetPassword():
    urlIdentifier = request.json.get("url_identifier", None)
    password = request.json.get("pass", None)
    encryptedPass = bcrypt.generate_password_hash(password).decode("utf8")
    response = makeRequest("SELECT id FROM user WHERE url_identifier = ?", (urlIdentifier,))
    if (not response):
        raise NotFoundError("No matching account found with the provided urlIdentifier")
    makeRequest("UPDATE user SET pass = ?, url_identifier = NULL WHERE id = ?", (str(encryptedPass), str(response[0]["id"])))
              
    return jsonify(ok=True, message="Account activated successfully")