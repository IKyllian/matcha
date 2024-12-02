class APIError(Exception):
    """All custom API Exceptions"""
    pass

class APIAuthError(APIError):
    """Custom Authentication Error Class."""
    code = 403
    description = "Authentication Error"

class ForbiddenError(APIError):
  """Custom Forbidden Error Class."""
  code = 403
  description = "Forbidden"
  
class NotFoundError(APIError):
  """Custom Not Found Error Class."""
  code = 403
  description = "Not found"

class TokenError(APIError):
    """Custom Authentication Error Class."""
    code = 401
    description = "Token Error"

class ServerError(APIError):
  code = 500
  description = "Server error"

class BadRequestError(APIError):
  code = 400
  description = "Bad Request"