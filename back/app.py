from app import createApp
from app import socketio

app = createApp()
if (__name__ == "__main__"):
    socketio.run(app, host="10.11.11.1", port="3000", debug=True)
