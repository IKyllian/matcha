from functools import wraps
from flask import request, jsonify
from utils.dataValidator import validate_data, ValidationError

def validate_request(rules):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                # Récupère les données JSON de la requête
                data = request.get_json() or {}
                validated_data = validate_data(data, rules)
                # Passe les données validées à la route
                kwargs['validated_data'] = validated_data
                return func(*args, **kwargs)
            except ValidationError as e:
                return jsonify({"error": e.args[0], "field": e.field}), 400
            except Exception as e:
                return jsonify({"error": "Erreur serveur", "details": str(e)}), 500
        return wrapper
    return decorator