from flask import jsonify, request
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required
from errors.httpErrors import ForbiddenError

@token_required
def viewUserById(user_id):
    user_to_view_id = request.json.get("user_to_view_id", None)
    if (user_id == user_to_view_id):
        raise ForbiddenError("Can't view your own profile")
    view = makeRequest("SELECT id FROM view WHERE view.user_id = ? AND view.viewed_user_id = ?", (str(user_id), str(user_to_view_id),))
    if (len(view) > 0):
        return jsonify(ok=True)
    else :
        userViewed = makeRequest("SELECT id FROM user WHERE id = ?", (str(user_to_view_id),))
        if (not userViewed):
            return jsonify(ko=True)
        makeRequest("INSERT INTO view (user_id, viewed_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_view_id)))
    return jsonify(ok=True)

def decodeImagesFromViews(views):
    for view in views:
        if (view["image_file"]):
            img = {
                "id": view["image_id"],
                "image_file": view["image_file"],
                "is_profile_picture": view["is_profile_picture"]
            }
            decoded = decodeImages([img])
            del view["image_id"]
            del view["image_file"]
            del view["is_profile_picture"]
            view["images"] = decoded
    return views

@token_required
def getUserViews(user_id, viewed_id):
    views = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM view LEFT JOIN user ON view.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE view.viewed_user_id = ?", (str(viewed_id),))
    return jsonify(views=views)

@token_required
def getViewsOfUser(user_id):
    views = makeRequest("SELECT user.id, user.first_name, user.last_name, image.id AS image_id, image.image_file, image.is_profile_picture FROM view LEFT JOIN user ON view.viewed_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE view.user_id = ?", (str(user_id),))
    views = decodeImagesFromViews(views)
    return jsonify(views=views)