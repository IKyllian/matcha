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