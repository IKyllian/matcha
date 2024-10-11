
from flask import Blueprint

from controller.userController import *
from controller.authController import *


auth_bp = Blueprint("auth", __name__)

auth_bp.route("/signin", methods = ["POST"]) (signin)

auth_bp.route("/signup", methods = ["POST"]) (signup)

auth_bp.route("/auth", methods = ["GET"]) (getAuth)
