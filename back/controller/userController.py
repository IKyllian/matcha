import base64
from flask import jsonify, request
from database_utils.decoratorFunctions import token_required
from database_utils.requests import *
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, decode_token

def getAgeFromTime(SqlTime):
    current_time = datetime.now()
    age = current_time - datetime.strptime(SqlTime, '%Y-%m-%d')
    return int(divmod(age.total_seconds(), 31536000)[0])

def getTimeFromAge(Age):
    return datetime.today() - relativedelta(years=int(Age))

@token_required
def getProfiles(user_id):
    min_age = request.args.get("min_age", None)
    max_age = request.args.get("max_age", None)
    max_pos = request.args.get("max_pos", None)
    min_fame = request.args.get("min_fame", None)
    tags = request.args.get("tags", None)

    if (min_age and max_age and int(min_age) > int(max_age)):
        return ("Invalid Params : min_age should be lower than max_age", 403)

    requestQuery = "SELECT id, username, first_name, last_name, birth_date, email, gender, sexual_preference, bio, fame_rating FROM user "
    if (min_age or max_age or max_pos or min_fame):
        requestQuery += "WHERE "
    #Check needAnd to know if you need to add " AND " to requestQuery
    needAnd = False
    if (min_age):
        needAnd = True
        requestQuery += "user.birth_date <= date('now', '-" + str(min_age) + " years') "
    if (max_age):
        if (needAnd == True):
            requestQuery += "AND "
        needAnd = True
        requestQuery += "user.birth_date >= date('now', '-" + str(max_age) + " years') "
    # TODO : Position
    # if (max_pos):
    #     if (needAnd == True):
    #         requestQuery += "AND "
    #     needAnd = True
    #     requestQuery += "user.birth_date <= " + str(getTimeFromAge(max_age)) + " "
    if (min_fame):
        if (needAnd == True):
            requestQuery += "AND "
        needAnd = True
        requestQuery += "user.fame_rating <= " + str(min_fame)
    if (tags and len(tags) > 0):
        if (needAnd == True):
            requestQuery += "AND "
        needAnd == True
        requestQuery += "INNER JOIN user_tag ut ON user.id = ut.user_id WHERE ut.tag_id IN ("
        needComma = False
        for tag in tags:
            if (needComma):
                requestQuery += ", "
            needComma = True
            requestQuery += str(tag)
        requestQuery += ") GROUP BY user.id HAVING COUNT(DISTINCT ut.tag_id) = " + str(len(tags))
    
    response = makeRequest(requestQuery)

    return response

@token_required
def getProfileById(user_id, profile_id):
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date FROM user WHERE id = ?", (str(profile_id),))
    user = response[0]
    user["age"] = getAgeFromTime(user["birth_date"])
    del user["birth_date"]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ?", (str(user_id),))
    user["images"] = decodeImages(images)
    userTags = makeRequest("SELECT user_id, tag_id AS id, tag_name FROM user_tag LEFT JOIN tag ON user_tag.tag_id = tag.id WHERE user_tag.user_id = ?", (str(profile_id),))
    user["tags"] = userTags
    if (user_id == profile_id):
        return jsonify(user=user)
    like = makeRequest("SELECT id FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(profile_id),))
    block = makeRequest("SELECT id FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(profile_id),))
    return jsonify(user=user, like=(len(like) > 0), block=(len(block) > 0))

@token_required
def getSettings(user_id):
    response = makeRequest("SELECT username, first_name, last_name, email, gender, sexual_preference, bio, birth_date FROM user WHERE id = ?", (str(user_id),))
    user = response[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ?", (str(user_id),))
    user["images"] = decodeImages(images)
    userTags = makeRequest("SELECT user_id, tag_id AS id, tag_name FROM user_tag LEFT JOIN tag ON user_tag.tag_id = tag.id WHERE user_tag.user_id = ?", (str(user_id),))
    user["tags"] = userTags
    allTags = makeRequest("SELECT id, tag_name FROM tag")
    return jsonify(user=user, tags=allTags)

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
    tags = request.form.getlist("tag_ids", None)
    images = []
    index = 0

    while f"images[{index}][file]" in request.files:
        image_file = request.files.get(f"images[{index}][file]")
        is_profile_picture = request.form.get(f"images[{index}][is_profile_picture]") == 'true'
        images.append({
        'file': image_file,
        'is_profile_picture': is_profile_picture
        })
        index += 1

    if (not checkImages(images)):
        return ("Invalid images sent", 403)
    
    #First we insert all the data we got from settings
    makeRequest("UPDATE user SET username = ?, email = ?, first_name = ?, last_name = ?, gender = ?, sexual_preference = ?, bio = ? WHERE id = ?",
                           (str(username), str(email), str(first_name), str(last_name), str(gender), str(sexual_preference), str(bio), str(user_id)))
    
    #We delete every tag before inserting the ones we received
    response = makeRequest("DELETE FROM user_tag WHERE user_id = ?", (str(user_id),))
    for tag in tags:
        response = makeRequest("INSERT INTO user_tag (user_id, tag_id) VALUES (?, ?)", (str(user_id), str(tag)))

    #We delete every image before inserting the ones we received
    response = makeRequest("DELETE FROM image WHERE user_id = ?", (str(user_id),))
    for image in images:
        makeRequest("INSERT INTO image (image_file, user_id, is_profile_picture) VALUES (?, ?, ?)",
                    (base64.b64encode(image["file"].read()), str(user_id), bool(image["is_profile_picture"])))

    return jsonify(ok=True)

@token_required
def getViewHistory(user_id):
    response = makeRequest("SELECT user_id FROM view WHERE viewed_user_id = ?", (str(user_id)))
    return jsonify(history=response)

@token_required
def getNotifications(user_id):
    response = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = ?", (str(user_id)))
    return response