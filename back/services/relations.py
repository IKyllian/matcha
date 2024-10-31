
from database_utils.requests import makeRequest

def getLikes(user_id, profile_id):
    return makeRequest("SELECT id FROM like WHERE like.user_id = ? AND like.liked_user_id = ?", (str(user_id), str(profile_id),))

def getBlocks(user_id, profile_id):
    return makeRequest("SELECT id FROM block WHERE block.user_id = ? AND block.blocked_user_id = ?", (str(user_id), str(profile_id),))

def getReports(user_id, user_to_report_id):
    return makeRequest("SELECT id FROM report WHERE report.user_id = ? AND report.reported_user_id = ?", (str(user_id), str(user_to_report_id),))