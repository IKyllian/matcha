from flask import jsonify, request
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required

@token_required
def viewUserById(user_id):
    user_to_view_id = request.json.get("user_to_view_id", None)
    view = makeRequest("SELECT id FROM view WHERE view.user_id = ? AND view.viewed_user_id = ?", (str(user_id), str(user_to_view_id),))
    if (len(view) > 0):
        response = makeRequest("DELETE FROM view WHERE view.user_id = ? AND view.viewed_user_id = ?", (str(user_id), str(user_to_view_id),))
    else :
        response = makeRequest("INSERT INTO view (user_id, viewed_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_view_id)))
    return jsonify(ok=True)

@token_required
def getUserViews(user_id, viewed_id):
    views = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM view LEFT JOIN user ON view.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE view.viewed_user_id = ?", (str(viewed_id),))
    
    return jsonify(views=views)

@token_required
def getViewsOfUser(user_id):
    views = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM view LEFT JOIN user ON view.viewed_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE view.user_id = ?", (str(user_id),))
    
    return jsonify(views=views)