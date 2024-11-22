
from flask import Blueprint

from controller.notifController import *

chat_bp = Blueprint("chat", __name__)

chat_bp.route("/notifications", methods = ["GET"]) (getNotif)

chat_bp.route("/deleteNotification/<int:notif_id>", methods = ["DELETE"]) (deleteNotif)

chat_bp.route("/deleteAllNotifications", methods = ["DELETE"]) (deleteAllNotifs)


