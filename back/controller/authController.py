import base64
from flask import request, jsonify
from controller.userController import getAgeFromTime
from services.user import getUserWithProfilePictureById, getUserWithProfilePictureByUsername
from database_utils.requests import *
from flask_jwt_extended import create_access_token, decode_token
from app import bcrypt
from errors.httpErrors import APIAuthError
import re
import ipdata

def get_client_ip():
    headers_to_check = [
        'HTTP_X_FORWARDED_FOR', 'X_FORWARDED_FOR',
        'HTTP_CLIENT_IP', 'HTTP_X_REAL_IP', 'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED', 'HTTP_VIA', 'REMOTE_ADDR'
    ]
    for header in headers_to_check:
        if header in request.environ:
            return request.environ[header].split(',')[0].strip()
    return request.remote_addr

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def isEmailValid(email):
    if re.fullmatch(regex, email):
      return True
    else:
      return False


def signin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        raise APIAuthError('Password is invalid')
    if (len(password) < 8 or len(password) > 20):
        raise APIAuthError('Password is invalid')
    
    response = makeRequest("SELECT pass FROM user WHERE username = ?", (str(username),))

    if len(response) < 1 or not bcrypt.check_password_hash(response[0]["pass"], password):
        raise APIAuthError('Bad username or password')
    user = getUserWithProfilePictureByUsername(username)
    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token, user=user)

def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if (len(username) < 3 or len(username) > 20 or any(not c.isalnum() for c in username)):
        raise APIAuthError('Username is invalid')
    if (len(password) < 8 or len(password) > 20):
        raise APIAuthError('Password is invalid')
    email = request.json.get("email", None)
    if (not isEmailValid(email)):
        raise APIAuthError('Email is invalid')
    first_name = request.json.get("first_name", None)
    if (len(first_name) < 3 or len(first_name) > 20 or any(not c.isalpha() for c in first_name)):
        raise APIAuthError('First name is invalid')
    last_name = request.json.get("last_name", None)
    if (len(last_name) < 3 or len(last_name) > 20 or any(not c.isalpha() for c in last_name)):
        raise APIAuthError('Last name is invalid')
    birth_date = request.json.get("birth_date", None)
    if (getAgeFromTime(birth_date) < 18):
        raise APIAuthError('User must bet at least 18 years old')
    
    ipdata.api_key = "060ae89add4de8cc3ff0c9f8da69adbf2515414caa66395cbcddfcec"
    try :
        ipAddress = get_client_ip()
        if ('10.11.' in ipAddress or '127.0.'in ipAddress):
            ipAddress = '46.231.218.157'
        data = ipdata.lookup(ipAddress)
        makeRequest("INSERT INTO user (username, pass, email, first_name, last_name, birth_date, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                            (str(username), bcrypt.generate_password_hash(password), str(email), str(first_name), str(last_name), str(birth_date), str(data['latitude']), str(data['longitude'])))
        user = getUserWithProfilePictureByUsername(username)
        access_token = create_access_token(identity=user["id"])
        return jsonify(access_token=access_token, user=user)
    except :
        raise APIAuthError('Location is not parseable')

def getAuth():
    try :
        token = request.args.get("jwt_token", None)
        data = decode_token(token)
        user_id = data["sub"]
        user = getUserWithProfilePictureById(user_id)
        return jsonify(user=user)
    except :
        raise APIAuthError('Token is invalid')
