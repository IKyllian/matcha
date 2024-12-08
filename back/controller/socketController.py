from datetime import datetime
from flask import request
from app import socketio
from errors.httpErrors import ForbiddenError
from controller.chatController import createMessage
from database_utils.requests import makeRequest, makeInsertRequest
from flask_socketio import emit
from decorators.authDecorator import socket_auth
from services.user import getUserWithProfilePictureById

user_socket_map = {}

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
            break
    dateNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    makeRequest("UPDATE user SET is_connected = 0, last_connection = ? WHERE id = ?", ((str(dateNow)), (str(user_id))))

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
    message = data.get('message')

    if (len(message) > 500):
        raise ForbiddenError("Votr message ne doit pas contenir plus que 500 charactere")
    messageCreated = createMessage(sender_id, receiver_id, message)
    sender = getUserWithProfilePictureById(user_id)
    username = sender["username"]
    sendNotificationEvent("Vous avez recu un message de " + username , sender, receiver_id)
    
    emit('receiveMessage', {'sender_id': sender_id, 'receiver_id': receiver_id, 'created_at': messageCreated[0]["created_at"], 'id': messageCreated[0]["id"], 'message': message}, room=request.sid)
    print(f"Message from {sender_id} to {receiver_id}: {message}")

    # Ensure the receiver is identified and connected
    if receiver_id in user_socket_map:
        receiver_socket_id = user_socket_map[receiver_id]
        emit('receiveMessage', {'sender_id': sender_id, 'receiver_id': receiver_id,'created_at': messageCreated[0]["created_at"], 'id': messageCreated[0]["id"], 'message': message}, room=receiver_socket_id)
    else:
        print(f"User {receiver_id} not connected, so not notified")

@socketio.on('sendNotification')
def handleConnect():
    print('Received event sendNotification:', request.sid)

def sendNotificationEvent(message, sender, receiver_id):
    sender_id = sender["id"]
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    isBlocked = makeRequest("SELECT 1 FROM block WHERE user_id = ? AND blocked_user_id = ?", (str(receiver_id), str(sender_id)))
    print(isBlocked)
    if (len(isBlocked) >=1):
        return
    
    notifId = makeInsertRequest("INSERT INTO notification (content, sender_id, receiver_id, created_at, was_seen) VALUES (?, ?, ?, ?, ?)",
                        (str(message), str(sender_id), str(receiver_id), str(created_at), "0"))
    notif = makeRequest("SELECT * FROM notification WHERE id = ?", (notifId,))
    print("Notif Created :", notif)
    if not receiver_id in user_socket_map:
        return
    else:
        receiver_socket_id = user_socket_map[receiver_id]
        socketio.emit('sendNotification', {'sender_id': sender_id, 'receiver_id': receiver_id,'created_at': created_at, 'id': notif[0]["id"], 'content': message, 'sender': sender}, room=receiver_socket_id)
