
from flask import Blueprint

from controller.userController import *
from controller.authController import *


auth_bp = Blueprint("auth", __name__)

auth_bp.route("/signin", methods = ["POST"]) (signin)

auth_bp.route("/signup", methods = ["POST"]) (signup)

auth_bp.route("/auth", methods = ["GET"]) (getAuth)

auth_bp.route("/checkUrlIdentifier", methods = ["GET"]) (checkUrlIdentifier)

auth_bp.route("/activateAccount", methods = ["POST"]) (activateAccount)

auth_bp.route("/sendPasswordReset", methods = ["POST"]) (sendResetPassword)

auth_bp.route("/resetPassword", methods = ["PATCH"]) (resetPassword)
