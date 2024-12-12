from functools import wraps
from flask import request
from errors.httpErrors import ForbiddenError, TokenError
from flask_jwt_extended import decode_token
from database_utils.requests import makeRequest

class DecoratorError(Exception):
    def __init__(self, message):
        super().__init__(message)

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            authorization = request.headers['Authorization']
            token = authorization.split()[1]
        if not token:
            raise TokenError("Vous n'avez pas de token")
        try:
            data = decode_token(token)
            user_id = data["sub"]
            response = makeRequest("SELECT username, is_activated FROM user WHERE id = ?", (str(user_id),))
            if len(response) < 1:
                raise DecoratorError("Votre token n'est pas associé à un utilisateur")
            if response[0]["is_activated"] != 1:
                raise DecoratorError("Votre compte n'est pas actif, veuillez valider votre email")
        except DecoratorError as e:
            raise TokenError(e.args[0])
        kwargs['user_id'] = user_id
        return f(*args, **kwargs)
    return decorator

def socket_auth(f):
    @wraps(f)
    def socket_auth_decorator(*args, **kwargs):
        eventArgs = args[0]
        if not eventArgs:
            raise TokenError("Erreur avec les arguments")
        if not 'token' in eventArgs:
            raise TokenError("Vous n'avez pas de token")
        token = eventArgs['token']
        try:
            data = decode_token(token)
            user_id = data["sub"]
            response = makeRequest("SELECT username, is_activated FROM user WHERE id = ?", (str(user_id),))
            if len(response) < 1:
                raise DecoratorError("Votre token n'est pas associé à un utilisateur")
            if response[0]["is_activated"] != 1:
                raise DecoratorError("Votre compte n'est pas actif, veuillez valider votre email")
        except DecoratorError as e:
            raise TokenError(e.args[0])
        kwargs['user_id'] = user_id
        return f(*args, **kwargs)
    return socket_auth_decorator

def blocked_check(key=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            user_id = kwargs['user_id']
            user_to_interact_id = kwargs["validated_data"][key]

            blocks = makeRequest('''SELECT block.id FROM block
                        WHERE (block.user_id = :user_id AND block.blocked_user_id = :user_to_interact_id)
                        OR (block.user_id = :user_to_interact_id AND block.blocked_user_id = :user_id)''',
                        {"user_id": user_id, "user_to_interact_id": user_to_interact_id})

            if len(blocks) > 0:
                raise ForbiddenError("Vous ne pouver pas interagir car cet utilisateur vous a bloqué ou vous l'avez bloqué")
            return func(*args, **kwargs)
        return wrapper
    return decorator