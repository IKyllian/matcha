from datetime import datetime
from flask import jsonify, request
from database_utils.requests import *
from database_utils.decoratorFunctions import token_required

def easteregg():
    return "<p>Congrats! You found the easteregg!</p>"

@token_required
def getChatById(user_id, chatter_id):
    chatter = makeRequest("SELECT id, first_name, last_name FROM user WHERE id = ?", (str(chatter_id)))
    messages = makeRequest("SELECT id, sender_id, receiver_id, created_at FROM message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC",
                           ((str(user_id)), (str(chatter_id)), (str(chatter_id)), (str(user_id))))
    return jsonify(chatter=chatter,messages=messages)

@token_required
def createMessage(user_id, chatter_id, message):
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    makeRequest("INSERT INTO message(sender_id, receiver_id, created_at, message) VALUES (?, ?, ?, ?)",
                ((user_id), (chatter_id), (created_at), (message)))
    return jsonify(ok=True)