import base64
import random
from flask import jsonify, request
from services.relations import *
from services.user import *
from decorators.authDecorator import auth
from decorators.dataDecorator import validate_request
from database_utils.requests import *
from database_utils.convert import getAgeFromTime
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from errors.httpErrors import ForbiddenError
import ipdata
import os
from errors.httpErrors import APIAuthError
from utils.images import decodeImagesFromArray, isImageFile

def getTimeFromAge(Age):
    return datetime.today() - relativedelta(years=int(Age))

def calculate_date_from_age(years):
    today = datetime.now()
    return (today - timedelta(days=years * 365.25)).strftime('%Y-%m-%d')

@auth()
def getTags(user_id):
    return jsonify(tags=getAllTags())

@auth()
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

@auth()
@validate_request({
    "min_age": {"type": int, "min": 18, "max": 100},
    "max_age": {"type": int, "min": 18, "max": 100},
    "max_pos": {"type": int, "min": 30, "max": 100000},
    "min_fame": {"type": int, "min": 0, "max": 5},
    "tags": {"type": 'tags'},
    "sort": {"type": int, "min": 0, "max": 5},
    "display_liked" : {"type": bool},
    "offset": {"type": int, "min": 0}
})
def getProfiles(user_id, validated_data):
    fields = ["min_age", "max_age", "max_pos", "min_fame", "tags", "sort", "display_liked", "offset"]
    min_age, max_age, max_pos, min_fame, tags, sort, display_liked, offset = [validated_data.get(key) for key in fields]
    if (not offset):
        offset = 0
    # Variable that tracks if we got every users yet (Used in front for 'display more' button)
    reachedEnd = False
    user = getUserWithImagesById(user_id)
    user_latitude = str(user["latitude"])
    user_longitude = str(user["longitude"])
    distance = f"(6371 * acos(cos(radians({user_latitude})) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians({user_longitude})) + sin(radians({user_latitude})) * sin(radians(user.latitude)))) AS distance,"

    if (min_age and max_age and int(min_age) > int(max_age)):
        raise ForbiddenError("Parametre invalide : min_age doit etre plus petit que max_age")
    queryParams = {}
    requestQuery = f"SELECT {str(distance)} user.id, username, first_name, last_name, birth_date, email, gender, sexual_preference, bio, fame_rating, is_activated, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name, like.id AS like FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1"
    requestQuery += f" LEFT JOIN block ON user.id = block.blocked_user_id AND block.user_id = {str(user_id)} "
    requestQuery += f" LEFT JOIN like ON user.id = like.liked_user_id AND like.user_id = {str(user_id)} "

    whereConditions = []
    whereConditions.append(f"user.id != {str(user_id)}")

    whereConditions.append("block.blocked_user_id IS NULL ")
    if (min_age):
        min_birth_date = calculate_date_from_age(int(min_age))
        whereConditions.append(f"user.birth_date <= :min_birth_date")
        queryParams.update({'min_birth_date': str(min_birth_date)})
    if (max_age):
        max_birth_date = calculate_date_from_age(int(max_age + 1))
        whereConditions.append(f"user.birth_date >= :max_birth_date")
        queryParams.update({'max_birth_date': str(max_birth_date)})
    if (max_pos):
        whereConditions.append(f"distance <= :max_pos")
        queryParams.update({'max_pos': max_pos})
    if (min_fame):
        whereConditions.append(f"user.fame_rating >= :min_fame")
        queryParams.update({'min_fame': min_fame})
    if (not display_liked):
        whereConditions.append(f"(like.id) IS NULL")
    userPref = user["sexual_preference"]
    userGender = user["gender"]
    if (userPref != "B"):
        whereConditions.append(f"user.gender = '{userPref}'")
    whereConditions.append(f"(user.sexual_preference = '{userGender}' OR user.sexual_preference = 'B')")
    whereConditions.append(f"(user.is_valid = '1')")
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

    groupByClose = ' GROUP BY user.id'
    requestQuery += groupByClose
    if (sort == 0):
        requestQuery += ' ORDER BY distance ASC'
    if (sort == 1):
        requestQuery += ' ORDER BY distance DESC'
    if (sort == 2):
        requestQuery += ' ORDER BY user.birth_date DESC'
    if (sort == 3):
        requestQuery += ' ORDER BY user.birth_date ASC'
    if (sort == 4):
        requestQuery += ' ORDER BY user.fame_rating ASC'
    if (sort == 5):
        requestQuery += ' ORDER BY user.fame_rating DESC'
    
    requestQuery += ' LIMIT 100 OFFSET ' + str(offset)

    users = makeRequest(requestQuery, queryParams)

    # if there are less than 100 users, it means we got to the end of the request
    if (len(users) < 100):
        reachedEnd = True
    users = decodeImagesFromArray(users)

    list = []
    for user in users:
        user["age"] = getAgeFromTime(user["birth_date"])
        del user["birth_date"]
        list.append({"like": True if user['like'] else False, "user": user})
    return jsonify(list=list, reachedEnd=reachedEnd)

@auth()
@validate_request({
    "offset": {"type": int, "min": 0}
})
def getSuggested(user_id, validated_data):
    # If it doesn't find offset, it initializes it at 0
    offset = validated_data.get("offset")
    if (not offset):
        offset = 0
    reachedEnd = False
    user = getUserWithImagesById(user_id)
    user_latitude = str(user["latitude"])
    user_longitude = str(user["longitude"])
    distance = f"(6371 * acos(cos(radians({user_latitude})) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians({user_longitude})) + sin(radians({user_latitude})) * sin(radians(user.latitude)))) AS distance,"

    max_pos = 400
    max_age_diff = 10

    user_age = getAgeFromTime(user["birth_date"])
    min_age = max(user_age - max_age_diff, 18)
    max_age = min(user_age + max_age_diff, 100)

    min_fame = max(user["fame_rating"] - 1.0, 1.0)
    
    user["tags"] = getUserTags(user_id)
    tags = [uTag["id"] for uTag in user["tags"]]


    #First we get every users that fit our restrictions
    queryParams = {}
    requestQuery = f"SELECT {str(distance)} user.id, username, first_name, last_name, birth_date, email, gender, sexual_preference, bio, fame_rating, is_activated, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name, like.id AS like FROM user LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1"
    requestQuery += f" LEFT JOIN block ON user.id = block.blocked_user_id AND block.user_id = {str(user_id)} "
    requestQuery += f" LEFT JOIN like ON user.id = like.liked_user_id AND like.user_id = {str(user_id)} "
    
    # Since the conditions are always the same we can hardcode the query
    whereConditions = [
        f"user.id != {str(user_id)}",
        "block.blocked_user_id IS NULL ",
        f"user.birth_date <= :min_birth_date",
        f"user.birth_date >= :max_birth_date",
        f"distance <= :max_pos",
        f"user.fame_rating >= :min_fame",
        f"(like.id) IS NULL",
        f"user.is_valid = '1'"
    ]
    
    userPref = user["sexual_preference"]
    userGender = user["gender"]
    if (userPref != "B"):
        whereConditions.append(f"user.gender = '{userPref}'")
    whereConditions.append(f"(user.sexual_preference = '{userGender}' OR user.sexual_preference = 'B')")

    queryParams = {
        'min_birth_date': str(calculate_date_from_age(min_age)),
        'max_birth_date': str(calculate_date_from_age(max_age)),
        'max_pos': max_pos,
        'min_fame': min_fame
    }

    # We also wan users to have at least one tag in common if current user has tags
    if (tags and len(tags) > 0):
        tagConditions = " INNER JOIN user_tag ut ON user.id = ut.user_id"
        tag_params = [f":tag_{i}" for i in range(len(tags))]
        whereConditions.append(f"ut.tag_id IN ({', '.join(tag_params)})")
        queryParams.update({f"tag_{i}": tag for i, tag in enumerate(tags)})
        requestQuery += tagConditions

    if whereConditions:
        requestQuery += ' WHERE ' + " AND ".join(whereConditions)

    groupByClose = ' GROUP BY user.id '
    requestQuery += groupByClose
    
    users = makeRequest(requestQuery, queryParams)
    users = decodeImagesFromArray(users)

    # We arbitrarily decided that dist was more important followed by age and then by fame
    age_weight = 1
    distance_weight = 2
    fame_weight = 0.5

    # We calculate user score and insert it in user object
    list = []
    for user in users:
        user["age"] = getAgeFromTime(user["birth_date"])
        del user["birth_date"]
        age_diff = abs(user["age"] - user_age)
        dist = user["distance"]
        fame_rating = user["fame_rating"]

        normalizedAgeDiff = 1 - (age_diff / max_age_diff)
        normalizedDist = 1 - (dist / max_pos)
        normalizedFameRating = 1 - (fame_rating / 5)

        weighted_score = (normalizedAgeDiff * age_weight) + (normalizedDist * distance_weight) + (normalizedFameRating * fame_weight)

        user["score"] = weighted_score
        list.append({"like": True if user['like'] else False, "user": user})

    # We sort users by their score
    list.sort(key=lambda x: x["user"]["score"], reverse=True)

    # We only get a 'page' from offset to offset+100 to avoid lag in front
    list = list[offset:100]
    if (len(list) < 100):
        reachedEnd = True

    return jsonify(list=list, reachedEnd=reachedEnd)

def filteredForSexualOrientation(currentUser, users):
    filtered_users = [
        user for user in users
        if not (
            (user["gender"] == 'M' and currentUser["sexual_preference"] == 'F') or
            (user["gender"] == 'F' and currentUser["sexual_preference"] == 'M') or
            (user["sexual_preference"] == 'M' and currentUser["gender"] == 'F') or
            (user["sexual_preference"] == 'F' and currentUser["gender"] == 'M')
        )
    ]
    return filtered_users

def filteredForInteraction(users):
    filtered_users = [
        user for user in users
        if user["gender"] in ['M', 'F']
        and user["sexual_preference"] in ['M', 'F', 'B']
        and user["is_activated"] == 1
        and "images" in user and checkImages(user["images"], True)
    ]
    return filtered_users

@auth()
@validate_request({
    "profile_id": {"required": True, "type": int, "min": 0},
})
def getProfileById(user_id, validated_data, profile_id):
    user_id = int(user_id)
    user = getUserWithImagesById(profile_id)
    user["age"] = getAgeFromTime(user["birth_date"])
    del user["birth_date"]
    user["tags"] = getUserTags(profile_id)
    if (user_id == profile_id):
        user["is_connected"] = True
        return jsonify(user=user)
    user["distance"] = getDistanceOfUser(user_id, profile_id)
    like = getLikes(user_id, profile_id)
    liked = getLikes(profile_id, user_id)
    block = getBlocks(user_id, profile_id)
    return jsonify(user=user, like=(len(like) > 0), liked=(len(liked) > 0), block=(len(block) > 0))

@auth(False)
def getSettings(user_id):
    user = getUserWithImagesById(user_id)
    user["tags"] = getUserTags(user_id)
    return jsonify(user=user, tags=getAllTags())

def checkImages(images, requiredProfilePicture = False):
    if (len(images) > 5):
        return False
    profilePicCount = 0
    for image in images:
        if (image["is_profile_picture"] == True):
            profilePicCount += 1
    if profilePicCount > 1:
        return False
    if (requiredProfilePicture and profilePicCount < 1):
        return False
    return True

MAX_IMAGE_SIZE = 15 * 1024 * 1024  # 15 MB in bytes
@auth(False)
@validate_request({
    "first_name": {"required": True,"type": str, "min": 2, "max": 35},
    "last_name": {"required": True, "type": str, "min": 2, "max": 35},
    "gender": {"type": str, "choices": ["M", "F"]},
    "sexual_preference": {"type": str, "choices": ["M", "F", "B"]},
    "bio": {"type": str, "min": 1, "max": 1000},
    "latitude": {"type": float},
    "longitude": {"type": float},
})
def setSettings(user_id, validated_data):
    fields = ["first_name", "last_name", "gender", "sexual_preference", "bio", "latitude", "longitude"]
    latitude = validated_data['latitude']
    longitude = validated_data['longitude']
    tags = request.form.getlist("tag_ids", None)
    images = []
    index = 0
    userPos = getUserPos(user_id)

    if (not latitude or not longitude):
        ipdata.api_key = os.getenv("IP_DATA_API_KEY")
        try :
            ipAddress = get_client_ip()
            if ('10.11.' in ipAddress or '127.0.'in ipAddress):
                ipAddress = os.getenv("PUBLIC_IP")
            data = ipdata.lookup(ipAddress)
            if (not data['latitude'] or not data['longitude']):
                print("Probleme avec la recuperation de la localisation -> Garde l'ancienne position")
            latitude = data['latitude'] if data['latitude'] else userPos['latitude']
            longitude = data['longitude'] if data['longitude'] else userPos['longitude']
        except :
            raise APIAuthError('Location est invalide')

    fieldsToUpdate = []
    fieldValues = {"user_id": user_id}
    for field in fields:
        if field == 'latitude' or field == 'longitude':
            value = latitude if field == 'latitude' else longitude
        else:
            value = validated_data[field]
        fieldsToUpdate.append(f"{field} = :{field}")
        fieldValues.update({field: value})

    while f"images[{index}][file]" in request.files:
        image_file = request.files.get(f"images[{index}][file]")

        length = image_file.seek(0, os.SEEK_END)
        if length > MAX_IMAGE_SIZE:
            raise ForbiddenError(f"Le fichier '{file_name}' dépasse la taille maximale autorisée de 10 Mo.")

        mime_type = image_file.content_type if image_file.content_type else "text/plain"
        file_name = image_file.filename if image_file.filename else ""
        is_profile_picture = request.form.get(f"images[{index}][is_profile_picture]") == 'true'
        
        if not isImageFile(image_file):
            raise ForbiddenError(f"Le fichier '{file_name}' n'est pas une image valide.")
        
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
    makeRequest(f"UPDATE user SET {', '.join(fieldsToUpdate)} WHERE id = :user_id", fieldValues)
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
    if isAccountValid(user) and not user['is_valid']:
        makeRequest("UPDATE user SET is_valid = '1' WHERE id = :user_id", (user_id,))
        user['is_valid'] = True
    elif not isAccountValid(user) and user['is_valid']:
        makeRequest("UPDATE user SET is_valid = '0' WHERE id = :user_id", (user_id,))
        user['is_valid'] = False
    return jsonify(user=user)

@auth()
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id),))
    return jsonify(history=response)