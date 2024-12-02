import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import smtplib
import sqlite3
from flask import render_template_string, request

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

def makeInsertRequest(query, params = ()):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row

    cur = connection.cursor()
    response = cur.execute(query, params)
    lastRowId = response.lastrowid

    connection.commit()
    connection.close()
    return lastRowId


def get_client_ip():
    headers_to_check = [
        'HTTP_X_FORWARDED_FOR', 'X_FORWARDED_FOR',
        'HTTP_CLIENT_IP', 'HTTP_X_REAL_IP', 'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED', 'HTTP_VIA', 'REMOTE_ADDR'
    ]
    for header in headers_to_check:
        if header in request.environ:
            return request.environ[header].split(',')[0].strip()
    return request.remote_addr

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USER = 'Matcha42LyonOfficial@gmail.com'  # Your email address
SMTP_PASSWORD = 'rgrk rrwt ztiw inbp '  # Your email password (use app password if 2FA enabled)

def send_email_auth(user_email, url_identifier):
    recipient_email = user_email
    subject = "Authentification Email"
    message_body = '''Bienvenue sur Matcha!
    Pour vous identifier, veuiller suivre le lien a cette adresse:
    ''' + os.getenv("FRONT_HOST") + "/activateAccount/" + url_identifier
    print("message_body = ", message_body)
    
    # Create email message
    message = MIMEMultipart()
    message['From'] = SMTP_USER
    message['To'] = recipient_email
    message['Subject'] = subject
    message.attach(MIMEText(message_body, 'plain'))

    try:
        # Connect to the SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Encrypt connection
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, recipient_email, message.as_string())
        
        print('Email sent successfully!')
    except Exception as e:
        return print(f'Error: {str(e)}')

    return render_template_string('''
        <form method="POST">
            <label for="email">Recipient Email:</label>
            <input type="email" name="email" required><br>
            
            <label for="subject">Subject:</label>
            <input type="text" name="subject" required><br>
            
            <label for="message">Message:</label>
            <textarea name="message" required></textarea><br>
            
            <button type="submit">Send Email</button>
        </form>
    ''')

def send_email_password(user_email, url_identifier):
    recipient_email = user_email
    subject = "Authentification Email"
    message_body = '''Pour reinitialiser votre mot de passe, veuiller suivre le lien a cette adresse:
    ''' + os.getenv("FRONT_HOST") + "/resetPassword/" + url_identifier
    
    # Create email message
    message = MIMEMultipart()
    message['From'] = SMTP_USER
    message['To'] = recipient_email
    message['Subject'] = subject
    message.attach(MIMEText(message_body, 'plain'))

    try:
        # Connect to the SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Encrypt connection
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, recipient_email, message.as_string())
        
        print('Email sent successfully!')
    except Exception as e:
        return print(f'Error: {str(e)}')

    return render_template_string('''
        <form method="POST">
            <label for="email">Recipient Email:</label>
            <input type="email" name="email" required><br>
            
            <label for="subject">Subject:</label>
            <input type="text" name="subject" required><br>
            
            <label for="message">Message:</label>
            <textarea name="message" required></textarea><br>
            
            <button type="submit">Send Email</button>
        </form>
    ''')