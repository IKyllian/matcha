
from flask import Blueprint

from controller.chatController import *

chat_bp = Blueprint("chat", __name__)

chat_bp.route("/easteregg", methods = ["GET"]) (easteregg)

chat_bp.route("/chat/<int:chatter_id>", methods = ["GET"]) (getChatById)

# chat_bp.route("/chat/<int:chatter_id>/send", methods = ["POST"]) (createMessage)

