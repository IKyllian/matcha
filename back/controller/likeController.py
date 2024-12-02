from flask import jsonify, request
from services.user import getUserWithImagesById
from database_utils.requests import *
from decorators.authDecorator import token_required
from decorators.dataDecorator import validate_request
from errors.httpErrors import ForbiddenError
from utils.images import decodeImagesFromArray

def calculate_fame(likes_received, likes_given):
    base_fame = 2.5
    fame = base_fame + (likes_received * 0.1) - (likes_given * 0.05)
    return max(0, min(fame, 5))

def updateFame(user_id):
    likes = makeRequest("SELECT (SELECT COUNT(*) FROM like WHERE user_id = :id) AS likes_given, (SELECT COUNT(*) FROM like WHERE liked_user_id = :id) AS likes_received",
                        ((str(user_id)),))

    fame = calculate_fame(likes[0]["likes_received"], likes[0]["likes_given"])
    makeRequest("UPDATE user SET fame_rating = ? WHERE id = ?", ((str(fame)), (str(user_id))))

@token_required
@validate_request({
    "user_to_like_id": {"required": True, "type": int, "min": 0},
})
def likeUserById(user_id, validated_data):
    user_to_like_id = validated_data['user_to_like_id']
    if (user_id == user_to_like_id):
        raise ForbiddenError("Vous ne pouvez pas like votre profil")
    if (not isAccountValid(getUserWithImagesById(user_to_like_id))):
        raise ForbiddenError("Le profil n'est pas complet et ne peut pas interagir")
    if (not isAccountValid(getUserWithImagesById(user_id))):
        raise ForbiddenError("Completer votre profil pour interagir")
    
    like = makeRequest("SELECT id FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(user_to_like_id),))
    if (len(like) > 0):
        makeRequest("DELETE FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(user_to_like_id),))
    else :
        makeRequest("INSERT INTO like (user_id, liked_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_like_id)))
        
    updateFame(user_id)
    updateFame(user_to_like_id)
    return jsonify(ok=True)

@token_required
@validate_request({
    "liked_id": {"required": True, "type": int, "min": 0},
})
def getUserLikes(user_id, validated_data, liked_id):
    likes = makeRequest("SELECT user.id, user.first_name, user.last_name, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name FROM like LEFT JOIN user ON like.liked_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE like.liked_user_id = ?", (str(liked_id),))
    likes = decodeImagesFromArray(likes)
    return jsonify(likes=likes)

@token_required
def getLikesOfUser(user_id):
    likes = makeRequest("SELECT user.id, user.first_name, user.last_name, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name FROM like LEFT JOIN user ON like.liked_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE like.user_id = ?", (str(user_id),))
    likes = decodeImagesFromArray(likes)
    return jsonify(likes=likes)