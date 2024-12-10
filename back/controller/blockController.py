from flask import jsonify, request
from services.user import getDistanceOfUser
from services.relations import *
from database_utils.requests import *
from decorators.authDecorator import token_required
from decorators.dataDecorator import validate_request
from errors.httpErrors import ForbiddenError
from utils.images import decodeImagesFromArray

@token_required
def blockUserById(user_id):
    user_to_block_id = request.json.get("user_to_block_id", None)
    if (user_id == user_to_block_id):
        raise ForbiddenError("Vous ne pouvez pas blocker votre profil")
    block = makeRequest("SELECT id FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(user_to_block_id),))
    if (len(block) > 0):
        makeRequest("DELETE FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(user_to_block_id),))
    else :
        makeRequest("INSERT INTO block (user_id, blocked_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_block_id)))
    return jsonify(ok=True)

@token_required
@validate_request({
    "blocked_id": {"required": True, "type": int, "min": 0},
})
def getUserBlocks(user_id, validated_data, blocked_id):
    blocks = makeRequest("SELECT user.id, user.first_name, user.last_name, image.id AS image_id, image.image_file, image.mime_type, image.file_name, image.is_profile_picture FROM block LEFT JOIN user ON block.user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE block.blocked_user_id = ?", (str(blocked_id),))
    blocks = decodeImagesFromArray(blocks)
    return jsonify(blocks=blocks)

@token_required
def getBlocksOfUser(user_id):
    blocks = makeRequest("SELECT user.id, user.first_name, user.last_name, user.gender, user.fame_rating, image.id AS image_id, image.image_file, image.mime_type, image.file_name, image.is_profile_picture FROM block LEFT JOIN user ON block.blocked_user_id = user.id LEFT JOIN image ON user.id = image.user_id AND image.is_profile_picture = 1 WHERE block.user_id = ?", (str(user_id),))
    for block in blocks:
        block["distance"] = getDistanceOfUser(user_id, block["id"])
    blocks = decodeImagesFromArray(blocks)
    return jsonify(blocks=blocks)

@token_required
@validate_request({
    "user_to_report_id": {"required": True, "type": int, "min": 0},
})
def reportUserById(user_id, validated_data):
    user_to_report_id = validated_data['user_to_report_id']
    if (user_id == user_to_report_id):
        raise ForbiddenError("Vous ne pouvez pas signaler votre profil")
    report = getReports(user_id, user_to_report_id)
    if (len(report) > 0):
        makeRequest("DELETE FROM report WHERE report.user_id = ? AND report.reported_user_id = ?", (str(user_id), str(user_to_report_id),))
    else :
        makeRequest("INSERT INTO report (user_id, reported_user_id) VALUES (?, ?)",
                           (str(user_id), str(user_to_report_id)))
    return jsonify(ok=True)