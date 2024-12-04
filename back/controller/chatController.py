from datetime import datetime
from flask import jsonify, request
from services.user import getUserWithProfilePictureById
from database_utils.requests import *
from decorators.authDecorator import token_required
from decorators.dataDecorator import validate_request

def easteregg():
    return "<p>Congrats! You found the easteregg!</p>"

@token_required
def getChatList(user_id):
    chats = makeRequest('''SELECT 
        l.user_id, 
        l.liked_user_id, 
        m.message, 
        m.created_at
    FROM 
        `like` l
    LEFT JOIN message m
        ON (l.user_id = m.receiver_id AND l.liked_user_id = m.sender_id)
        OR (l.user_id = m.sender_id AND l.liked_user_id = m.receiver_id)
        AND m.created_at = (
            SELECT MAX(m2.created_at)
            FROM message m2
            WHERE 
                (m2.sender_id = l.user_id AND m2.receiver_id = l.liked_user_id)
                OR (m2.sender_id = l.liked_user_id AND m2.receiver_id = l.user_id)
        )
    WHERE 
        (
            (l.user_id = ? AND l.liked_user_id IN (SELECT liked_user_id FROM `like` WHERE user_id = ?))
            OR 
            (l.liked_user_id = ? AND l.user_id IN (SELECT liked_user_id FROM `like` WHERE user_id = ?))
        )
        AND l.user_id = ?
    GROUP BY 
        l.user_id, 
        l.liked_user_id
    ORDER BY 
        m.created_at DESC;''', (str(user_id), str(user_id), str(user_id), str(user_id), str(user_id)))
    
    user = getUserWithProfilePictureById(user_id)
    for chat in chats:
        chat["user"] = user
        chat["liked_user"] = getUserWithProfilePictureById(chat["liked_user_id"])
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