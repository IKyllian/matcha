from app import createApp, socketio
from controller.socketController import *
import os

app = createApp()
if (__name__ == "__main__"):
    socketio.run(app, host=os.getenv("HOST", "localhost"), port="3000", debug=True, allow_unsafe_werkzeug=True)
