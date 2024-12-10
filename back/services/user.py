from database_utils.convert import getAgeFromTime
from database_utils.requests import decodeImages, makeRequest

def getAllTags():
    return makeRequest("SELECT id, tag_name FROM tag")

def getUserTags(user_id):
    return makeRequest("SELECT user_id, tag_id AS id, tag_name FROM user_tag LEFT JOIN tag ON user_tag.tag_id = tag.id WHERE user_tag.user_id = ?", (str(user_id),))

def getDistanceOfUser(user_id, other_user_id):
    user = getUserWithProfilePictureById(user_id)
    user_latitude = user["latitude"]
    user_longitude = user["longitude"]
    distance = f"(6371 * acos(cos(radians({user_latitude})) * cos(radians(user.latitude)) * cos(radians(user.longitude) - radians({user_longitude})) + sin(radians({user_latitude})) * sin(radians(user.latitude)))) AS distance"
    distance = makeRequest(f"SELECT {str(distance)} FROM user WHERE id = :user_id", (other_user_id,))
    return distance[0]["distance"]

def getUserWithImagesById(user_id):
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date, latitude, longitude, is_connected, last_connection, is_activated FROM user WHERE id = ?", (str(user_id),))
    user = response[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture, mime_type, file_name FROM image WHERE image.user_id = ?", (str(user_id),))
    user["images"] = decodeImages(images)
    return user

def getUserWithProfilePictureById(user_id):
    result = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date, latitude, longitude, is_connected, last_connection, is_activated FROM user WHERE user.id = ?", (str(user_id),))
    user = result[0]
    user["age"] = getAgeFromTime(user["birth_date"])
    del user["birth_date"]

    images = makeRequest("SELECT id, image_file, is_profile_picture, mime_type, file_name FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
    user["images"] = decodeImages(images)
    return user

def getUserWithProfilePictureByUsername(username):
    result = makeRequest("SELECT user.id, username, first_name, last_name, gender, sexual_preference, birth_date, is_connected, last_connection, is_activated FROM user WHERE username = ?", (str(username),))
    user = result[0]
    user["age"] = getAgeFromTime(user["birth_date"])
    del user["birth_date"]

    images = makeRequest("SELECT id, image_file, is_profile_picture, mime_type, file_name FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
    user["images"] = decodeImages(images)
    return user