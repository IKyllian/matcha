import hashlib
from flask import request, jsonify
from controller.notifController import getAllNotifs, getNotif
from controller.userController import getAgeFromTime
from services.user import getUserWithProfilePictureById, getUserWithProfilePictureByUsername
from database_utils.requests import *
from flask_jwt_extended import create_access_token, decode_token
from app import bcrypt
from errors.httpErrors import APIAuthError
import re
import ipdata
import os

regex = re.compile(r'([A-Za-z0-9._+-]+)@[A-Za-z0-9-]+(\.[A-Za-z|a-z]{2,})+')

def isEmailValid(email):
    if re.fullmatch(regex, email):
      return True
    else:
      return False


def signin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        raise APIAuthError("Nom d'utilisateur invalide")
    if (len(password) < 8 or len(password) > 20):
        raise APIAuthError('Mot de passe invalide')
    
    response = makeRequest("SELECT pass FROM user WHERE username = ?", (str(username),))

    if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
        raise APIAuthError("Mauvais nom d'utilisateur ou mot de passe")
    user = getUserWithProfilePictureByUsername(username)
    access_token = create_access_token(identity=user["id"])
    notifications = getAllNotifs(user["id"])
    return jsonify(access_token=access_token, user=user, notifications=notifications)

def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        raise APIAuthError("Nom d'utilisateur invalide")
    usernameUsed = makeRequest("SELECT COUNT(*) AS count FROM user WHERE username = :username", (str(username),))
    if (int(usernameUsed[0]["count"]) > 0):
        raise APIAuthError("Le nom d'utilisateur est deja utilisee")
    if (len(password) < 8 or len(password) > 20):
        raise APIAuthError('Mot de passe invalide')
    email = request.json.get("email", None)
    if (not isEmailValid(email)):
        raise APIAuthError('Email invalide')
    emailUsed = makeRequest("SELECT COUNT(*) AS count FROM user WHERE email = :email", (str(email),))
    if (int(emailUsed[0]["count"]) > 0):
        raise APIAuthError("L'email est deja utilisee")
    first_name = request.json.get("first_name", None)
    if (len(first_name) < 3 or len(first_name) > 20 or any(not c.isalpha() for c in first_name)):
        raise APIAuthError('Prenom invalide')
    last_name = request.json.get("last_name", None)
    if (len(last_name) < 3 or len(last_name) > 20 or any(not c.isalpha() for c in last_name)):
        raise APIAuthError('Nom de famille invalide')
    birth_date = request.json.get("birth_date", None)
    if (getAgeFromTime(birth_date) < 18):
        raise APIAuthError("L'utilisateur doit avoir au moins 18 ans")

    ipdata.api_key = os.getenv("IP_DATA_API_KEY")
    try :
        ipAddress = get_client_ip()
        if ('10.11.' in ipAddress or '127.0.'in ipAddress):
            ipAddress = os.getenv("PUBLIC_IP")
        data = ipdata.lookup(ipAddress)
        user_id = makeInsertRequest("INSERT INTO user (username, pass, email, first_name, last_name, birth_date, fame_rating, latitude, longitude, is_activated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            (str(username), bcrypt.generate_password_hash(password), str(email), str(first_name), str(last_name), str(birth_date), str(2.5), str(data['latitude']), str(data['longitude']), str(0)))
    except :
        raise APIAuthError('Location est invalide')
    dataToEncode = (str(user_id) + str(os.urandom(16)))
    urlIdentifier = hashlib.sha256(dataToEncode.encode()).hexdigest()
    print("urlIdentifier =", urlIdentifier)
    makeRequest("UPDATE user SET url_identifier = ? WHERE id = ?", ((str(urlIdentifier)), (str(user_id))))
    send_email(email, urlIdentifier)
    return jsonify(ok=True)

def getAuth():
    try :
        token = request.args.get("jwt_token", None)
        data = decode_token(token)
        user_id = data["sub"]
        user = getUserWithProfilePictureById(user_id)
        #notifications = getAllNotifs(user_id)
        notifications = []
        return jsonify(user=user, notifications=notifications)
    except :
        raise APIAuthError('Token invalide')

def activateAccount():
    urlIdentifier = request.json.get("url_identifier", None)
    response = makeRequest("SELECT id FROM user WHERE url_identifier = ?", (urlIdentifier,))
    if (not response):
        return jsonify(ok=False, message="No matching account found with the provided urlIdentifier"), 404
    makeRequest("UPDATE user SET is_activated = ? WHERE id = ?", (str(1), str(response[0]["id"])))
              
    return jsonify(ok=True, message="Account activated successfully")
    
