from datetime import datetime
from enum import Enum
from flask import request
from app import socketio
from errors.httpErrors import ForbiddenError
from controller.chatController import createMessage
from database_utils.requests import makeRequest, makeInsertRequest
from flask_socketio import emit
from decorators.authDecorator import socket_auth
from services.user import getUserWithProfilePictureById

user_socket_map = {}

class NotifType(Enum):
    MESSAGE = 0
    LIKE = 1
    MATCH = 2
    VIEW = 3

@socketio.on('connect')
def handleConnect():
    print('Received event Connect:', request.sid)

@socketio.on('identify')
@socket_auth
def handle_identify(token, user_id):
    if not user_id in user_socket_map:
        user_socket_map[user_id] = request.sid
    print(f"User {user_id} identified with socket ID {request.sid}")
    dateNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("dateNow=", dateNow)
    makeRequest("UPDATE user SET is_connected = 1, last_connection = ? WHERE id = ?", ((str(dateNow)), (str(user_id))))
    emit('connectionUpdate', {'user_id': user_id, 'is_connected': True}, broadcast = True)

@socketio.on('disconnect')
def handle_disconnect():
    print(f"User disconnected: {request.sid}")
    # Remove the user from the map when they disconnect
    for user_id, socket_id in user_socket_map.items():
        if socket_id == request.sid:
            del user_socket_map[user_id]
            dateNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            makeRequest("UPDATE user SET is_connected = 0, last_connection = ? WHERE id = ?", ((str(dateNow)), (str(user_id))))
            break

@socketio.on('logout')
@socket_auth
def handle_disconnect(data, user_id):
    print(f"User disconnected: {request.sid}")
    # Remove the user from the map when they disconnect
    for user_id, socket_id in user_socket_map.items():
        if socket_id == request.sid:
            del user_socket_map[user_id]
            break
    dateNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("user_id = ", user_id)
    makeRequest("UPDATE user SET is_connected = 0, last_connection = ? WHERE id = ?", ((str(dateNow)), (str(user_id))))
    emit('connectionUpdate', {'user_id': user_id, 'is_connected': False}, broadcast = True)

@socketio.on('sendMessage')
@socket_auth
def handle_send_message(data, user_id):
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    receiver_id = str(receiver_id)
    blocks = makeRequest('''SELECT block.id FROM block
                        WHERE (block.user_id = :user_id AND block.blocked_user_id = :user_to_interact_id)
                        OR (block.user_id = :user_to_interact_id AND block.blocked_user_id = :user_id)''',
                        {"user_id": sender_id, "user_to_interact_id": receiver_id})
    if len(blocks) > 0:
        raise ForbiddenError("Vous ne pouver pas interagir car cet utilisateur vous a bloqué ou vous l'avez bloqué")
    
    message = data.get('message')

    if (len(message) > 500 or len(message) < 1):
        raise ForbiddenError("Votre message doit contenir entre 1 et 500 characteres")
    
    messageCreated = createMessage(sender_id, receiver_id, message)
    
    sender = getUserWithProfilePictureById(user_id)
    username = sender["username"]
    
    last_notif = makeRequest('''SELECT id, content, notif_type FROM notification 
                                WHERE receiver_id = ? AND sender_id = ?
                                AND was_seen = 0 ORDER BY created_at DESC LIMIT 1''',
                            (receiver_id, sender_id))
    
    if last_notif and last_notif[0]["notif_type"] == NotifType.MESSAGE.value:
        last_notif = last_notif[0]  # Get the most recent notification
        new_content = last_notif["content"].split(" ")
        
        # Increment the message count in the notification content
        new_content[3] = str(int(new_content[3]) + 1)  # Increment the message count
        updated_content = " ".join(new_content)
        
        # Update the notification with the new content
        makeRequest('''UPDATE notification SET content = ?, was_seen = 0 WHERE id = ?''',
                    (updated_content, last_notif["id"],))
        
        #Send update notification
        if receiver_id in user_socket_map:
            receiver_socket_id = user_socket_map[receiver_id]
            socketio.emit('updateNotification', {'sender_id': sender_id, 'receiver_id': receiver_id,'created_at': created_at, 'id': notif[0]["id"], 'content': message, 'sender': sender, "notif_type": type.value}, room=receiver_socket_id)
        else:
            print(f"User {receiver_id} not connected, so not notified of notification update")
    else :
        sendNotificationEvent("Vous avez recu 1 message de " + username , sender, receiver_id, NotifType.MESSAGE)
    
    # Send back message to user who sent it
    emit('receiveMessage', {'sender_id': sender_id, 'receiver_id': receiver_id, 'created_at': messageCreated[0]["created_at"], 'id': messageCreated[0]["id"], 'message': message}, room=request.sid)
    
    print(f"Message from {sender_id} to {receiver_id}: {message}")

    # Ensure the receiver is identified and connected
    if (receiver_id) in user_socket_map:
        receiver_socket_id = user_socket_map[receiver_id]
        emit('receiveMessage', {'sender_id': sender_id, 'receiver_id': receiver_id,'created_at': messageCreated[0]["created_at"], 'id': messageCreated[0]["id"], 'message': message}, room=receiver_socket_id)
    else:
        print(f"User {receiver_id} not connected, so not notified of message sent")

@socketio.on('sendNotification')
def handleConnect():
    print('Received event sendNotification:', request.sid)

def sendNotificationEvent(message, sender, receiver_id, type: NotifType):
    sender_id = sender["id"]
    receiver_id = str(receiver_id)
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    isBlocked = makeRequest("SELECT 1 FROM block WHERE user_id = ? AND blocked_user_id = ?", (str(receiver_id), str(sender_id)))
    receiver_id = str(receiver_id)
    if (len(isBlocked) >=1):
        return
    
    notifId = makeInsertRequest("INSERT INTO notification (content, sender_id, receiver_id, created_at, was_seen, notif_type) VALUES (?, ?, ?, ?, ?, ?)",
                        (str(message), str(sender_id), str(receiver_id), str(created_at), "0", str(type.value)))
    notif = makeRequest("SELECT * FROM notification WHERE id = ?", (notifId,))
    if receiver_id in user_socket_map:
        receiver_socket_id = user_socket_map[receiver_id]
        socketio.emit('sendNotification', {'sender_id': sender_id, 'receiver_id': receiver_id,'created_at': created_at, 'id': notif[0]["id"], 'content': message, 'sender': sender, "notif_type": type.value}, room=receiver_socket_id)
    else:
        print(f"User {receiver_id} not connected, so not notified")
