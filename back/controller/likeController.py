from flask import jsonify, request
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required

@token_required
def likeUserById(user_id):
    user_to_like_id = request.json.get("user_to_like_id", None)
    like = makeRequest("SELECT id FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(user_to_like_id),))
    if (len(like) > 0):
        response = makeRequest("DELETE FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(user_to_like_id),))
    else :
        response = makeRequest("INSERT INTO like (user_id, liked_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_like_id)))
    return jsonify(ok=True)

@token_required
def getUserLikes(user_id):
    likes = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM like LEFT JOIN user ON like.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE like.liked_user_id = ?", str(user_id),)
    
    return jsonify(likes=likes)

@token_required
def getLikesOfUser(user_id):
    likes = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM like LEFT JOIN user ON like.liked_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE like.user_id = ?", str(user_id),)
    
    return jsonify(likes=likes)