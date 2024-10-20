
from flask import Blueprint

from controller.userController import *

user_bp = Blueprint("user", __name__)

user_bp.route("/profile/", methods = ["GET"]) (getProfiles)

user_bp.route("/profile/<int:profile_id>", methods = ["GET"]) (getProfileById)

user_bp.route("/profile/settings", methods = ["GET"]) (getSettings)

user_bp.route("/profile/view_history", methods = ["GET"]) (getViewHistory)

user_bp.route("/notifications", methods = ["GET"]) (getNotifications)
