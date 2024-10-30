from flask import jsonify, request
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required

@token_required
def likeUserById(user_id):
    user_to_like_id = request.json.get("user_to_like_id", None)
    if (user_id == user_to_like_id):
        return ("Can't like your own profile!", 403)
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date FROM user WHERE id = ?", (str(user_to_like_id),))
    user = response[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ?", (str(user_to_like_id),))
    user["images"] = decodeImages(images)
    if (not isAccountValid(user)):
        return ("Account you're trying to like is invalid!", 403)
    response = makeRequest("SELECT id, username, first_name, last_name, email, gender, sexual_preference, bio, fame_rating, birth_date FROM user WHERE id = ?", (str(user_id),))
    user = response[0]
    images = makeRequest("SELECT id, image_file, is_profile_picture FROM image WHERE image.user_id = ?", (str(user_id),))
    user["images"] = decodeImages(images)
    if (not isAccountValid(user)):
        return ("Account trying to like is invalid!", 403)
    
    like = makeRequest("SELECT id FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(user_to_like_id),))
    if (len(like) > 0):
        response = makeRequest("DELETE FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(user_to_like_id),))
    else :
        response = makeRequest("INSERT INTO like (user_id, liked_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_like_id)))
    return jsonify(ok=True)

@token_required
def getUserLikes(user_id, liked_id):
    likes = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM like LEFT JOIN user ON like.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE like.liked_user_id = ?", (str(liked_id),))
    
    return jsonify(likes=likes)

@token_required
def getLikesOfUser(user_id):
    likes = makeRequest("SELECT user.id, user.first_name, user.last_name, image.id AS image_id, image.image_file, image.is_profile_picture FROM like LEFT JOIN user ON like.liked_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE like.user_id = ?", (str(user_id),))
    for like in likes:
        if (like["image_file"]):
            img = {
                "id": like["image_id"],
                "image_file": like["image_file"],
                "is_profile_picture": like["is_profile_picture"]
            }
            decoded = decodeImages([img])
            del like["image_id"]
            del like["image_file"]
            del like["is_profile_picture"]
            like["images"] = decoded
    return jsonify(likes=likes)