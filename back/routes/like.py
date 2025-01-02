
from flask import Blueprint

from controller.likeController import *

like_bp = Blueprint("like", __name__)

like_bp.route("/like", methods = ["POST"]) (likeUserById)

like_bp.route("/getMatchesOfUser", methods = ["GET"]) (getMatchesOfUser)

like_bp.route("/getUserLikes", methods = ["GET"]) (getUserLikes)

like_bp.route("/getLikesOfUser", methods = ["GET"]) (getLikesOfUser)


