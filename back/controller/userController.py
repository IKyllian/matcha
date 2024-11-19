import base64
from flask import jsonify, request
from services.relations import *
from services.user import *
from database_utils.decoratorFunctions import token_required
from database_utils.requests import *
from database_utils.convert import getAgeFromTime
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, decode_token
from errors.httpErrors import ForbiddenError
import ipdata
import os
from errors.httpErrors import APIAuthError

def getTimeFromAge(Age):
    return datetime.today() - relativedelta(years=int(Age))

@token_required
def getTags(user_id):
    return jsonify(tags=getAllTags())

@token_required
def getProfiles(user_id):
    user = getUserWithImagesById(user_id)
    user_latitude = str(user["latitude"])
    user_longitude = str(user["longitude"])
    distance = "(6371 * acos(cos(radians(" + user_latitude + ")) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians(" + user_longitude + ")) + sin(radians(" + user_latitude + ")) * sin(radians(user.latitude)))) AS distance,"

    min_age = request.args.get("min_age", None)
    max_age = request.args.get("max_age", None)
    max_pos = request.args.get("max_pos", None)
    min_fame = request.args.get("min_fame", None)
    tags = request.args.get("tags", None)
    if (not max_pos):
        distance = ""

    if (min_age and max_age and int(min_age) > int(max_age)):
        raise ForbiddenError("Invalid Params : min_age should be lower than max_age")

    requestQuery = "SELECT " + distance + " user.id, username, first_name, last_name, birth_date, email, gender, sexual_preference, bio, fame_rating, image.id AS image_id, image.image_file, image.is_profile_picture FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE user.id != " + str(user_id) + " "
    #Check needAnd to know if you need to add " AND " to requestQuery
    
    if (min_age):
        requestQuery += "AND "
        requestQuery += "user.birth_date <= date('now', '-" + str(min_age) + " years') "
    if (max_age):
        requestQuery += "AND "
        requestQuery += "user.birth_date >= date('now', '-" + str(max_age) + " years') "
    if (max_pos):
        requestQuery += "AND "
        requestQuery += " distance <= " + str(max_pos) + " "
        #requestQuery += "(user.latitude -" + user_latitude + ")*(user.latitude -" + user_latitude + ") + (user.longitude -" + user_longitude + ")*(user.longitude -" + user_longitude + ") <= " + str(max_pos) + " "
    if (min_fame):
        requestQuery += "AND "
        requestQuery += "user.fame_rating <= " + str(min_fame)
    # if (tags and len(tags) > 0):
    #     requestQuery += "AND "
    #     requestQuery += "INNER JOIN user_tag ut ON user.id = ut.user_id WHERE ut.tag_id IN ("
    #     needComma = False
    #     for tag in tags:
    #         if (needComma):
    #             requestQuery += ", "
    #         needComma = True
    #         requestQuery += str(tag)
    #     requestQuery += ") GROUP BY user.id HAVING COUNT(DISTINCT ut.tag_id) = " + str(len(tags))
    users = makeRequest(requestQuery)

    for user in users:
        if (user["image_file"]):
            img = {
                "id": user["image_id"],
                "image_file": user["image_file"],
                "is_profile_picture": user["is_profile_picture"]
            }
            decoded = decodeImages([img])
            del user["image_id"]
            del user["image_file"]
            del user["is_profile_picture"]
            user["images"] = decoded

    return users

@token_required
def getProfileById(user_id, profile_id):
    user = getUserWithImagesById(profile_id)
    user["age"] = getAgeFromTime(user["birth_date"])
    del user["birth_date"]
    user["tags"] = getUserTags(profile_id)
    if (user_id == profile_id):
        return jsonify(user=user)
    like = getLikes(user_id, profile_id)
    block = getBlocks(user_id, profile_id)
    return jsonify(user=user, like=(len(like) > 0), block=(len(block) > 0))

@token_required
def getSettings(user_id):
    user = getUserWithImagesById(user_id)
    user["tags"] = getUserTags(user_id)
    return jsonify(user=user, tags=getAllTags())

def checkImages(images):
    if (len(images) > 5):
        return False
    profilePicCount = 0
    for image in images:
        if (image["is_profile_picture"] == True):
            profilePicCount += 1
    if profilePicCount > 1:
        return False
    return True

@token_required
def setSettings(user_id):
    username = request.form.get("username", None)
    email = request.form.get("email", None)
    first_name = request.form.get("first_name", None)
    last_name = request.form.get("last_name", None)
    gender = request.form.get("gender")
    sexual_preference = request.form.get("sexual_preference", None)
    bio = request.form.get("bio", None)
    latitude = request.form.get("latitude", None)
    longitude = request.form.get("longitude", None)
    tags = request.form.getlist("tag_ids", None)
    images = []
    index = 0

    print('latitude', latitude)
    print('longitude', longitude)
    if (not latitude or not longitude):
        print('GET pos from ip adress')
        ipdata.api_key = os.getenv("IP_DATA_API_KEY")
        try :
            ipAddress = get_client_ip()
            if ('10.11.' in ipAddress or '127.0.'in ipAddress):
                ipAddress = os.getenv("PUBLIC_IP")
            data = ipdata.lookup(ipAddress)
            latitude = data['latitude']
            longitude = data['longitude']
        except :
            raise APIAuthError('Location is not parseable')

    while f"images[{index}][file]" in request.files:
        image_file = request.files.get(f"images[{index}][file]")
        mime_type = image_file.content_type if image_file.content_type else "text/plain"
        file_name = image_file.filename if image_file.filename else ""
        is_profile_picture = request.form.get(f"images[{index}][is_profile_picture]") == 'true'
        images.append({
        'file': image_file,
        'is_profile_picture': is_profile_picture,
        'mime_type': mime_type,
        'file_name': file_name
        })
        index += 1
    
    if (not checkImages(images)):
        raise ForbiddenError("Invalid images sent")
        
    #First we insert all the data we got from settings
    makeRequest("UPDATE user SET username = ?, email = ?, first_name = ?, last_name = ?, gender = ?, sexual_preference = ?, bio = ?, latitude = ?, longitude = ? WHERE id = ?",
                (str(username), str(email), str(first_name), str(last_name), str(gender), str(sexual_preference), str(bio), str(latitude), str(longitude), str(user_id)))
    #We delete every tag before inserting the ones we received
    makeRequest("DELETE FROM user_tag WHERE user_id = ?", (str(user_id),))
    for tag in tags:
        makeRequest("INSERT INTO user_tag (user_id, tag_id) VALUES (?, ?)", (str(user_id), str(tag)))

    #We delete every image before inserting the ones we received
    makeRequest("DELETE FROM image WHERE user_id = ?", (str(user_id),))
    for image in images:
        makeRequest("INSERT INTO image (image_file, mime_type, file_name, user_id, is_profile_picture) VALUES (?, ?, ?, ?, ?)",
                    (base64.b64encode(image["file"].read()), image["mime_type"], image['file_name'], str(user_id), bool(image["is_profile_picture"])))

    return jsonify(ok=True)

@token_required
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id)))
    return jsonify(history=response)

@token_required
def getNotifications(user_id):
    response = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = ?", (str(user_id)))
    return response