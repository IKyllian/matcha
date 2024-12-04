from datetime import datetime
from flask import request
from app import socketio
from controller.chatController import createMessage
from database_utils.requests import makeRequest, makeInsertRequest
from errors.httpErrors import APIAuthError
from flask_jwt_extended import create_access_token, decode_token
from flask_socketio import send, emit
from decorators.authDecorator import socket_auth

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

@socketio.on('disconnect')
def handle_disconnect():
    print(f"User disconnected: {request.sid}")
    # Remove the user from the map when they disconnect
    for user_id, socket_id in list(user_socket_map.items()):
        if socket_id == request.sid:
            del user_socket_map[user_id]
            break
    dateNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    makeRequest("UPDATE user SET is_connected = 0, last_connection = ? WHERE id = ?", ((str(dateNow)), (str(user_id))))
    

@socketio.on('sendMessage')
@socket_auth
def handle_send_message(data, user_id):
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    message = data.get('message')

    messageCreated = createMessage(sender_id, receiver_id, message)
    emit('receiveMessage', {'sender_id': sender_id, 'receiver_id': receiver_id, 'created_at': messageCreated[0]["created_at"], 'id': messageCreated[0]["id"], 'message': message}, room=request.sid)
    print(f"Message from {sender_id} to {receiver_id}: {message}")

    # Ensure the receiver is identified and connected
    if receiver_id in user_socket_map:
        receiver_socket_id = user_socket_map[receiver_id]
        emit('receiveMessage', {'sender_id': sender_id, 'receiver_id': receiver_id,'created_at': messageCreated[0]["created_at"], 'id': messageCreated[0]["id"], 'message': message}, room=receiver_socket_id)
    else:
        print(f"User {receiver_id} not connected, so not notified")
    

