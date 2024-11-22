from datetime import datetime
from flask import jsonify, request
from controller.userController import getProfileById
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required

@token_required
def getNotif(user_id):
    notifs = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen FROM notification WHERE receiver_id = :id ORDER BY created_at DESC", (str(user_id),))
    receiver = getProfileById(user_id)
    sender = getProfileById(notifs["sender_id"])
    notifs["sender"] = sender
    notifs["receiver"] = receiver
    del notifs["sender_id"]
    del notifs["receiver_id"]
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