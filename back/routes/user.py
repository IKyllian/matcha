
from flask import Blueprint

from controller.userController import *

user_bp = Blueprint("user", __name__)

user_bp.route("/profile", methods = ["GET"]) (getProfiles)

user_bp.route("/getTags", methods = ["GET"]) (getTags)

user_bp.route("/profile/<int:profile_id>", methods = ["GET"]) (getProfileById)

user_bp.route("/profile/settings", methods = ["GET"]) (getSettings)

user_bp.route("/profile/setSettings", methods = ["POST"]) (setSettings)

user_bp.route("/profile/viewHistory", methods = ["GET"]) (getViewHistory)

user_bp.route("/notifications", methods = ["GET"]) (getNotifications)
