from functools import wraps
from flask import request
from errors.httpErrors import TokenError
from flask_jwt_extended import decode_token
from database_utils.requests import makeRequest

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
                raise TokenError("Votre token n'est pas associé à un utilisateur")
            if response[0]["is_activated"] != 1:
                raise TokenError("Votre compte n'est pas actif, veuillez valider votre email")
        except:
            raise TokenError("Vous n'avez pas de token valide")
        kwargs['user_id'] = user_id
        return f(*args, **kwargs)
    return decorator