from app import bcrypt
import hashlib
import os

def encrypt_pass(password: str) -> str:
    encryptedPass = bcrypt.generate_password_hash(password).decode("utf8")
    return encryptedPass

def encode_url_identifier(user_id: int) -> str:
    dataToEncode = (str(user_id) + str(os.urandom(16)))
    urlIdentifier = hashlib.sha256(dataToEncode.encode()).hexdigest()
    return urlIdentifier