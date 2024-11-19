import base64
import sqlite3

#Used to check if you can like an account
def isAccountValid(user):
    if (not user["gender"]
        or not user["sexual_preference"]):
        return False
    if (not user["images"] or len(user["images"]) == 0):
        return False
    profilePicExists = False
    for image in user["images"]:
        if (image["is_profile_picture"] == True):
            profilePicExists = True
    if (not profilePicExists):
        return False
    return True

def decodeImages(images):
    for image in images:
        decoded = image["image_file"].decode("utf-8")
        mime_type = image["mime_type"]
        image["image_file"] = f"data:{mime_type};base64,{decoded}"
        image["is_profile_picture"] = bool(image["is_profile_picture"])
    return images

def makeRequest(query, params = ()):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row

    cur = connection.cursor()
    response = cur.execute(query, params)

    rows = response.fetchall()
    unpacked = [{k: item[k] for k in item.keys()} for item in rows]

    connection.commit()
    connection.close()
    return unpacked
