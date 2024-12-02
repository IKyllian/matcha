from database_utils.requests import decodeImages

def decodeImagesFromArray(array):
    for item in array:
        if (item["image_file"]):
            img = {
                "id": item["image_id"],
                "image_file": item["image_file"],
                "is_profile_picture": item["is_profile_picture"],
                "mime_type": item["mime_type"],
                "file_name": item["file_name"]
            }
            decoded = decodeImages([img])
            del item["image_id"]
            del item["image_file"]
            del item["is_profile_picture"]
            item["images"] = decoded
    return array