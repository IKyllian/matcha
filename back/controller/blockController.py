from flask import jsonify, request
from services.relations import *
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required
from errors.httpErrors import ForbiddenError

@token_required
def blockUserById(user_id):
    user_to_block_id = request.json.get("user_to_block_id", None)
    if (user_id == user_to_block_id):
        raise ForbiddenError("Can't block your own profile")
    block = makeRequest("SELECT id FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(user_to_block_id),))
    if (len(block) > 0):
        makeRequest("DELETE FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(user_to_block_id),))
    else :
        makeRequest("INSERT INTO block (user_id, blocked_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_block_id)))
    return jsonify(ok=True)

@token_required
def getUserBlocks(user_id, blocked_id):
    blocks = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM block LEFT JOIN user ON block.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE block.blocked_user_id = ?", (str(blocked_id),))
    return jsonify(blocks=blocks)

@token_required
def getBlocksOfUser(user_id):
    blocks = makeRequest("SELECT user.id, user.first_name, user.last_name, image.image_file AS profile_picture FROM block LEFT JOIN user ON block.blocked_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE block.user_id = ?", (str(user_id),))
    return jsonify(blocks=blocks)

@token_required
def reportUserById(user_id):
    user_to_report_id = request.json.get("user_to_report_id", None)
    if (user_id == user_to_report_id):
        raise ForbiddenError("Can't report your own profile")
    report = getReports(user_id, user_to_report_id)
    if (len(report) > 0):
        makeRequest("DELETE FROM report WHERE report.user_id = ? AND report.reported_user_id = ?", (str(user_id), str(user_to_report_id),))
    else :
        makeRequest("INSERT INTO report (user_id, reported_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_report_id)))
    return jsonify(ok=True)