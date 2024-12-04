from app import createApp
from app import socketio
from controller.socketController import *
import os

app = createApp()
if (__name__ == "__main__"):
    socketio.run(app, host=os.getenv("HOST"), port="3000", debug=True)
