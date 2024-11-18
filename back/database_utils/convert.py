from datetime import datetime

def getAgeFromTime(SqlTime):
    current_time = datetime.now()
    age = current_time - datetime.strptime(SqlTime, '%Y-%m-%d')
    return int(divmod(age.total_seconds(), 31536000)[0])