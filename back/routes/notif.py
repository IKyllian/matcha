
from flask import Blueprint

from controller.notifController import *

notif_bp = Blueprint("notif", __name__)

notif_bp.route("/notifications", methods = ["GET"]) (getNotif)

notif_bp.route("/deleteNotification/<int:notif_id>", methods = ["DELETE"]) (deleteNotif)

notif_bp.route("/deleteAllNotifications", methods = ["DELETE"]) (deleteAllNotifs)

notif_bp.route("/seeNotifications", methods = ["PATCH"]) (seeNotifs)

