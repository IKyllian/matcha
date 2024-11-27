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
        # ensure the jwt-token is passed with the headers
        if 'Authorization' in request.headers:
            authorization = request.headers['Authorization']
            token = authorization.split()[1]
        if not token: # throw error if no token provided
            raise TokenError("Vous n'avez pas de token")
        try:
           # decode the token to obtain user public_id
            data = decode_token(token)
            user_id = data["sub"]
            response = makeRequest("SELECT username, is_activated FROM user WHERE id = ?", (str(user_id),))
            if len(response) < 1:
                raise TokenError("Votre token n'est pas associe a un utilisateur")
            if (response[0]["is_activated"] != 1):
                raise TokenError("Votre compte n'est pas actif, veuillez valider votre email")
        except:
            raise TokenError("Vous n'avez pas de token valide")
        
         # Return the user information attached to the token
        return f(user_id, *args, **kwargs)
    return decorator