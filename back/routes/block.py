
from flask import Blueprint

from controller.blockController import *

block_bp = Blueprint("block", __name__)

block_bp.route("/block", methods = ["POST"]) (blockUserById)

block_bp.route("/getUserBlocks>", methods = ["GET"]) (getUserBlocks)

block_bp.route("/getBlocksOfUser", methods = ["GET"]) (getBlocksOfUser)

block_bp.route("/report", methods = ["POST"]) (reportUserById)

