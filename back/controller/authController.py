from flask import request, jsonify
from controller.notifController import getAllNotifs
from controller.userController import getAgeFromTime
from services.user import getUserWithProfilePictureById, getUserWithProfilePictureByUsername
from decorators.dataDecorator import validate_request
from database_utils.requests import *
from flask_jwt_extended import create_access_token, decode_token
from app import bcrypt
from errors.httpErrors import APIAuthError
import re
import ipdata
import os

# regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

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
    "email": {"required": True, "type": str}, # TODO: Fix => "regex": r"/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"},
    "password": {"required": True, "type": str, "min": 8},
    "birth_date": {"required": True, "type": str, "date_format": "%Y-%m-%d"}, # TODO: Check pour la date et l'age
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
        #TODO Create a unique ID url_identifier -> Send it by email, put is_activated to false by default
        makeRequest("INSERT INTO user (username, pass, email, first_name, last_name, birth_date, fame_rating, latitude, longitude, is_activated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            (str(username), bcrypt.generate_password_hash(password), str(email), str(first_name), str(last_name), str(birth_date), str(2.5), str(data['latitude']), str(data['longitude']), str(1)))
        user = getUserWithProfilePictureByUsername(username)
        access_token = create_access_token(identity=user["id"])
        print("YO2")
        return jsonify(access_token=access_token, user=user)
    except :
        raise APIAuthError('Location est invalide')

def getAuth():
    try :
        token = request.args.get("jwt_token", None)
        data = decode_token(token)
        user_id = data["sub"]
        user = getUserWithProfilePictureById(user_id)
        notifications = getAllNotifs(user_id)
        # notifications = []
        return jsonify(user=user, notifications=notifications)
    except :
        raise APIAuthError('Token invalide')
