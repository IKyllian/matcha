from flask import jsonify
from services.user import getUserWithProfilePictureById
from database_utils.requests import *
from decorators.authDecorator import auth
from decorators.dataDecorator import validate_request

def getAllNotifs(user_id):
    notifs = makeRequest("SELECT id, content, sender_id, receiver_id, created_at, was_seen, notif_type FROM notification WHERE receiver_id = :id ORDER BY created_at DESC", (str(user_id),))
    receiver = getUserWithProfilePictureById(user_id)
    senderCache = {}

    for notif in notifs:
        sender_id = notif["sender_id"]

        if sender_id not in senderCache:
            sender = getUserWithProfilePictureById(sender_id)
            senderCache[sender_id] = sender
        else:
            sender = senderCache[sender_id]

        notif["sender"] = sender
        notif["receiver"] = receiver
        del notif["sender_id"]
        del notif["receiver_id"]
    return notifs

@auth()
def getNotif(user_id):
    notifs = getAllNotifs(user_id)
    return jsonify(notifications=notifs)

@auth()
@validate_request({
    "notif_id": {"required": True, "type": int, "min": 0},
})
def deleteNotif(user_id, validated_data, notif_id):
    makeRequest("DELETE FROM notification WHERE id = ? AND receiver_id = ?", (str(notif_id), str(user_id)))
    return jsonify(ok=True)

@auth()
def deleteAllNotifs(user_id):
    makeRequest("DELETE FROM notification WHERE receiver_id = ?", (str(user_id),))
    return jsonify(ok=True)

@auth()
def seeNotifs(user_id):
    makeRequest("UPDATE notification SET was_seen = 1 WHERE receiver_id = :id", (str(user_id),))
    return jsonify(ok=True)