from functools import wraps

from flask import app, jsonify, make_response, request
from flask_jwt_extended import decode_token
from flask_jwt_extended import get_jwt_identity
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
            return make_response(jsonify({"message": "A valid token is missing!"}), 401)
        try:
           # decode the token to obtain user public_id
            data = decode_token(token)
            user_id = data["sub"]
            response = makeRequest("SELECT username FROM user WHERE id = ?", (str(user_id),))
            if len(response) < 1:
                return make_response(jsonify({"message": "Token not associated to a user!"}), 401)
        except:
            return make_response(jsonify({"message": "Invalid token!"}), 401)
         # Return the user information attached to the token
        return f(user_id, *args, **kwargs)
    return decorator