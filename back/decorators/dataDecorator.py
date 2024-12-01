from functools import wraps
from flask import request, jsonify
from utils.dataValidator import validate_data, ValidationError

def validate_request(rules=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                data = {}
                if request.content_type == 'application/json':
                    json_data = request.get_json(silent=True)
                    if json_data:
                        data.update(json_data)
                if request.form:  # Form data
                    data.update(request.form.to_dict())
                if request.args:  # URL query params
                    data.update(request.args.to_dict())
                data.update({key: value for key, value in kwargs.items() if key not in data})
                validated_data = validate_data(data, rules) if rules else data
                kwargs['validated_data'] = validated_data
                return func(*args, **kwargs)
            except ValidationError as e:
                return jsonify({"error": e.args[0], "field": e.field}), 400
            except Exception as e:
                return jsonify({"error": "Erreur serveur", "details": str(e)}), 500
        return wrapper
    return decorator