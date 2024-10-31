
from database_utils.requests import makeRequest


def getReports(user_id, user_to_report_id):
    return makeRequest("SELECT id FROM report WHERE report.user_id = ? AND report.reported_user_id = ?", (str(user_id), str(user_to_report_id),))