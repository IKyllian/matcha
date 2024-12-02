import base64
from flask import jsonify, request
from services.relations import *
from services.user import *
from decorators.authDecorator import token_required
from decorators.dataDecorator import validate_request
from database_utils.requests import *
from database_utils.convert import getAgeFromTime
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from errors.httpErrors import ForbiddenError
import ipdata
import os
from errors.httpErrors import APIAuthError
from utils.images import decodeImagesFromArray

def getTimeFromAge(Age):
    return datetime.today() - relativedelta(years=int(Age))

def calculate_date_from_age(years):
    today = datetime.now()
    return (today - timedelta(days=years * 365.25)).strftime('%Y-%m-%d')

@token_required
def getTags(user_id):
    return jsonify(tags=getAllTags())

@token_required
@validate_request({
    "tag_name": {"type": str, "min": 2, "max": 30, "isalnum": True},
})
def createTag(user_id, validated_data):
    tag_name = validated_data['tag_name'].lower()
    allTags = getAllTags()
    if (any(t["tag_name"]==tag_name for t in allTags)):
        raise ForbiddenError('Le tag existe deja')

    createdTagId = makeInsertRequest("INSERT INTO tag(tag_name) VALUES (?)", ((tag_name),))
    tag = makeRequest("SELECT * FROM tag WHERE id = :tagId", {"tagId" : createdTagId})
    if (not len(tag)):
        raise ForbiddenError('Error during tag creation')
    return jsonify(tag=tag[0])

@token_required
@validate_request({
    "min_age": {"type": int, "min": 18, "max": 100},
    "max_age": {"type": int, "min": 18, "max": 100},
    "max_pos": {"type": int, "min": 30, "max": 100000},
    "min_fame": {"type": int, "min": 0, "max": 5},
    "tags": {},
})
def getProfiles(user_id, validated_data):
    fields = ["min_age", "max_age", "max_pos", "min_fame", "tags"]
    min_age, max_age, max_pos, min_fame, tags = (validated_data[key] for key in fields)
    
    user = getUserWithImagesById(user_id)
    user_latitude = str(user["latitude"])
    user_longitude = str(user["longitude"])
    distance = f"(6371 * acos(cos(radians({user_latitude})) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians({user_longitude})) + sin(radians({user_latitude})) * sin(radians(user.latitude)))) AS distance,"

    if (type(tags) is str):
        tags = tags.split(',')

    if (not max_pos):
        distance = ""

    if (min_age and max_age and int(min_age) > int(max_age)):
        raise ForbiddenError("Parametre invalide : min_age doit etre plus petit que max_age")
    queryParams = {}
    requestQuery = f"SELECT {str(distance)} user.id, username, first_name, last_name, birth_date, email, gender, sexual_preference, bio, fame_rating, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1"
    requestQuery += f" LEFT JOIN block ON user.id = block.blocked_user_id AND block.user_id = {str(user_id)} "
    #Check needAnd to know if you need to add " AND " to requestQuery
    whereConditions = []
    whereConditions.append(f"user.id != {str(user_id)}")

    whereConditions.append("block.blocked_user_id IS NULL ")
    if (min_age):
        min_birth_date = calculate_date_from_age(int(min_age))
        whereConditions.append(f"user.birth_date <= :min_birth_date")
        queryParams.update({'min_birth_date': str(min_birth_date)})
    if (max_age):
        max_birth_date = calculate_date_from_age(int(max_age))
        whereConditions.append(f"user.birth_date >= :max_birth_date")
        queryParams.update({'max_birth_date': str(max_birth_date)})
    if (max_pos):
        whereConditions.append(f"distance <= :max_pos")
        queryParams.update({'max_pos': str(max_pos)})
    if (min_fame):
        whereConditions.append(f"user.fame_rating <= :min_fame")
        queryParams.update({'min_fame': str(min_fame)})
    
    if (tags and len(tags) > 0):
        tagJoin = ""
        i:int = 1
        while (i < len(tags) + 1):
            tagJoin += " INNER JOIN user_tag ut" + str(i) + " ON user.id = ut"+ str(i) +".user_id AND ut" + str(i) + ".tag_id = :tag_" + str(i - 1)
            queryParams.update({f"tag_{i}": tag for i, tag in enumerate(tags)})
            i+=1
        requestQuery += tagJoin

    if (len(whereConditions) > 0):
        requestQuery += ' WHERE '
        requestQuery += " AND ".join(whereConditions)

    groupByClose = ' GROUP BY user.id '
    requestQuery += groupByClose
    
    users = makeRequest(requestQuery, queryParams)
    users = decodeImagesFromArray(users)
    return users

@token_required
@validate_request({
    "profile_id": {"required": True, "type": int, "min": 0},
})
def getProfileById(user_id, validated_data, profile_id): # validated_data doit être garder ici même si pas utliser sinon erreur (peut être regarder plus tard pour check pourquoi ça met une erreur)
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
    print("user_id = ", user_id)
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
@validate_request({
    "username": {"required": True, "type": str, "min": 3, "max": 20},
    "email": {"required": True, "type": str, "regex": r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'},
    "first_name": {"required": True,"type": str, "min": 2, "max": 35},
    "last_name": {"required": True, "type": str, "min": 2, "max": 35},
    "gender": {"type": str, "choices": ["M", "F"]},
    "sexual_preference": {"type": str, "choices": ["M", "F", "B"]},
    "bio": {"type": str, "min": 2, "max": 1000},
    "latitude": {"type": float},
    "longitude": {"type": float},
})
def setSettings(user_id, validated_data):
    fields = ["username", "email", "first_name", "last_name", "gender", "sexual_preference", "bio", "latitude", "longitude"]
    username, email, first_name, last_name, gender, sexual_preference, bio, latitude, longitude = (validated_data[key] for key in fields)
    tags = request.form.getlist("tag_ids", None)
    images = []
    index = 0

    if (not latitude or not longitude):
        ipdata.api_key = os.getenv("IP_DATA_API_KEY")
        try :
            ipAddress = get_client_ip()
            if ('10.11.' in ipAddress or '127.0.'in ipAddress):
                ipAddress = os.getenv("PUBLIC_IP")
            data = ipdata.lookup(ipAddress)
            latitude = data['latitude']
            longitude = data['longitude']
        except :
            raise APIAuthError('Location est invalide')

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
        raise ForbiddenError("Images invalides envoyees")
        
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

    user = getUserWithProfilePictureById(user_id)
    return jsonify(user=user)

@token_required
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id)))
    return jsonify(history=response)