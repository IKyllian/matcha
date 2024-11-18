
from database_utils.requests import decodeImages, makeRequest

def getAllTags():
    return makeRequest("SELECT id, tag_name FROM tag")

def getUserTags(user_id):
    return makeRequest("SELECT user_id, tag_id AS id, tag_name FROM user_tag LEFT JOIN tag ON user_tag.tag_id = tag.id WHERE user_tag.user_id = ?", (str(user_id),))

def getUserWithImagesById(user_id):
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date FROM user WHERE id = ?", (str(user_id),))
    user = response[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ?", (str(user_id),))
    user["images"] = decodeImages(images)
    return user

def getUserWithProfilePictureById(user_id):
    result = makeRequest("SELECT user.id, username FROM user WHERE user.id = ?", (str(user_id),))
    user = result[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
    user["images"] = decodeImages(images)
    return user

def getUserWithProfilePictureByUsername(username):
    result = makeRequest("SELECT user.id, username, first_name, last_name FROM user WHERE username = ?", (str(username),))
    user = result[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ? AND image.is_profile_picture = 1", (str(user["id"]),))
    user["images"] = decodeImages(images)
    return user