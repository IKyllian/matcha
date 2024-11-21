
from flask import Blueprint

from controller.viewController import *

view_bp = Blueprint("view", __name__)

view_bp.route("/view", methods = ["POST"]) (viewUserById)

view_bp.route("/getUserViews", methods = ["GET"]) (getUserViews)

view_bp.route("/getViewsOfUser", methods = ["GET"]) (getViewsOfUser)


