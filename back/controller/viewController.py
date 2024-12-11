from flask import jsonify, request
from services.user import getDistanceOfUser, getUserWithProfilePictureById
from controller.socketController import NotifType, sendNotificationEvent
from database_utils.requests import *
from decorators.authDecorator import token_required
from errors.httpErrors import ForbiddenError
from decorators.dataDecorator import validate_request
from utils.images import decodeImagesFromArray

@token_required
@validate_request({
    "user_to_view_id": {"required": True, "type": int, "min": 0},
})
def viewUserById(user_id, validated_data):
    user_to_view_id = validated_data['user_to_view_id']
    if (user_id == user_to_view_id):
        raise ForbiddenError("Vous ne pouvez pas voir votre profil")
    view = makeRequest("SELECT id FROM view WHERE view.user_id = ? AND view.viewed_user_id = ?", (str(user_id), str(user_to_view_id),))
    if (len(view) > 0):
        return jsonify(ok=True)
    else :
        userViewed = makeRequest("SELECT id FROM user WHERE id = ?", (str(user_to_view_id),))
        if (not userViewed):
            return jsonify(ko=True)
        makeRequest("INSERT INTO view (user_id, viewed_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_view_id)))
        user = getUserWithProfilePictureById(user_id)
        username = user["username"]
        sendNotificationEvent(username + " a visité votre profile", user, user_to_view_id, NotifType.VIEW)
    return jsonify(ok=True)

@token_required
def getUserViews(user_id):
    views = makeRequest("SELECT user.id, user.first_name, user.last_name, user.gender, user.fame_rating, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name FROM view LEFT JOIN user ON view.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE view.viewed_user_id = ?", (str(user_id),))
    for view in views:
        view["distance"] = getDistanceOfUser(user_id, view["id"])
    views = decodeImagesFromArray(views)
    return jsonify(views=views)

@token_required
def getViewsOfUser(user_id):
    views = makeRequest("SELECT user.id, user.first_name, user.last_name, image.id AS image_id, image.image_file, image.is_profile_picture, image.mime_type, image.file_name FROM view LEFT JOIN user ON view.viewed_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE view.user_id = ?", (str(user_id),))
    views = decodeImagesFromArray(views)
    return jsonify(views=views)