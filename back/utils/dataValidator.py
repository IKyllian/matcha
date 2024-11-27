import re
from datetime import datetime

class ValidationError(Exception):
    def __init__(self, message, field=None):
        super().__init__(message)
        self.field = field

def validate_data(data, rules):
    validated_data = {}
    for field, rule in rules.items():
        value = data.get(field)
        if 'required' in rule and rule['required'] and value is None:
          raise ValidationError(f"{field} est requis.", field)
        if value is not None:
          if 'type' in rule and not isinstance(value, rule['type']):
            raise ValidationError(f"{field} doit être de type {rule['type'].__name__}.", field)
          if 'isalnum' in rule and rule['isalnum'] and not str(value).isalnum():
            raise ValidationError(f"{field} doit être alphanumérique.", field)
          if 'isalpha' in rule and rule['isalpha'] and not str(value).isalpha():
            raise ValidationError(f"{field} doit contenir uniquement des lettres.", field)
          if 'min' in rule and (isinstance(value, str) and len(value) < rule['min'] or isinstance(value, int) and value < rule['min']):
            raise ValidationError(f"{field} doit être supérieur ou égal à {rule['min']}.", field)
          if 'max' in rule and (isinstance(value, str) and len(value) > rule['max'] or isinstance(value, int) and value > rule['max']):
            raise ValidationError(f"{field} doit être inférieur ou égal à {rule['max']}.", field)
          if 'choices' in rule and value not in rule['choices']:
            raise ValidationError(f"{field} doit être une des valeurs suivantes: {rule['choices']}.", field)
          if 'regex' in rule and not re.match(rule['regex'], str(value)):
            raise ValidationError(f"{field} a un format invalide.", field)
          if 'date_format' in rule:
            try:
              datetime.strptime(value, rule['date_format'])
            except ValueError:
              raise ValidationError(f"{field} doit être une date valide au format {rule['date_format']}.", field)
        validated_data[field] = value
    return validated_data