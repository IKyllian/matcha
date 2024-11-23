from datetime import datetime
from flask import jsonify, request
from services.user import getUserWithProfilePictureById
from controller.userController import getProfileById
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required

def getAllNotifs(user_id):
    notifs = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = :id ORDER BY created_at DESC", (str(user_id),))
    receiver = getUserWithProfilePictureById(user_id)
    for notif in notifs:
        sender = getUserWithProfilePictureById(notif["sender_id"])
        notif["sender"] = sender
        notif["receiver"] = receiver
        del notif["sender_id"]
        del notif["receiver_id"]
    return notifs

@token_required
def getNotif(user_id):
    notifs = getAllNotifs(user_id)
    return jsonify(notifications=notifs)

@token_required
def deleteNotif(user_id, notif_id):
    response = makeRequest("DELETE FROM notification WHERE id = ? AND receiver_id = ?", (str(notif_id), str(user_id)))
    return jsonify(ok=True)

@token_required
def deleteAllNotifs(user_id):
    response = makeRequest("DELETE FROM notification WHERE receiver_id = ?", (str(user_id),))
    return jsonify(ok=True)

@token_required
def seeNotifs(user_id):
    response = makeRequest("UPDATE notification SET was_seen = 1 WHERE receiver_id = :id", (str(user_id),))
    return jsonify(ok=True)