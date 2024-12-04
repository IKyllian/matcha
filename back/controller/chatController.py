from datetime import datetime
from flask import jsonify
from services.user import getUserWithProfilePictureById
from database_utils.requests import *
from decorators.authDecorator import token_required
from decorators.dataDecorator import validate_request

def easteregg():
    return "<p>Congrats! You found the easteregg!</p>"

@token_required
def getChatList(user_id):
    chats = makeRequest('''
        SELECT
            l1.liked_user_id AS matched_user,
            m.message as last_message,
            m.created_at as last_send_at
        FROM like l1
        JOIN like l2
        ON l1.user_id = l2.liked_user_id
        AND l1.liked_user_id = l2.user_id
        LEFT JOIN message m
            ON (l1.user_id = m.receiver_id AND l1.liked_user_id = m.sender_id)
            OR (l1.user_id = m.sender_id AND l1.liked_user_id = m.receiver_id)
            AND m.created_at = (
                SELECT MAX(m2.created_at)
                FROM message m2
                WHERE
                    (m2.sender_id = l1.user_id AND m2.receiver_id = l1.liked_user_id)
                    OR
                    (m2.sender_id = l1.liked_user_id AND m2.receiver_id = l1.user_id)
            )
        WHERE l1.user_id = :user_id
        ORDER BY
            m.created_at DESC;
    ''', {"user_id": user_id})
    user = getUserWithProfilePictureById(user_id)
    for chat in chats:
        chat["user"] = user
        chat["liked_user"] = getUserWithProfilePictureById(chat["matched_user"])
    return jsonify(chats)

@token_required
@validate_request({
    "chatter_id": {"required": True, "type": int, "min": 0},
})
def getChatById(user_id, validated_data, chatter_id):
    chatter = getUserWithProfilePictureById(chatter_id)
    messages = makeRequest("SELECT id, sender_id, receiver_id, created_at, message FROM message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC",
                           ((str(user_id)), (str(chatter_id)), (str(chatter_id)), (str(user_id))))
    return jsonify(chatter=chatter,messages=messages)

def createMessage(user_id, chatter_id, message):
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    response = makeInsertRequest("INSERT INTO message(sender_id, receiver_id, created_at, message) VALUES (?, ?, ?, ?)",
                ((user_id), (chatter_id), (created_at), (message)))
    messageSent = makeRequest("SELECT * FROM message WHERE id = :id", (str(response),))
    return messageSent