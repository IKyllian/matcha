import base64
import sqlite3
import random

import bcrypt

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

tags = {
    'musique',
    'gaming',
    'lecture',
    'sport',
    'politique',
    'science',
    'call of duty',
    'lethal company',
    'cigarettes',
    'pizza'
}

for tag in tags:
    cur.execute("INSERT INTO tag (tag_name) VALUES (?)",
                (tag,))


# password = bcrypt.generate_password_hash('passpass')
password = "passpass"

users = [
    {
        'name': 'blank',
        'pass' : password,
        'email' : 'blank@gmail.com',
        'first_name' : 'Blank',
        'last_name' : 'Blank',
        'gender' : 'F',
        'sexual_preference' : 'M',
        'birth_date' : '1950-04-10',
        'latitude' : '42.74800109863281',
        'longitude' : '6.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'blank.png',
        'tag_ids' : [1, 6, 10]
    },
    {
        'name': 'adam',
        'pass' : password,
        'email' : 'adam@gmail.com',
        'first_name' : 'Adam',
        'last_name' : 'C',
        'gender' : 'M',
        'sexual_preference' : 'F',
        'birth_date' : '2000-07-01',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'google.png',
        'tag_ids' : [5, 8, 9]
    },
    {
        'name': 'kyllian',
        'pass' : password,
        'email' : 'kyllian@gmail.com',
        'first_name' : 'Kyllian',
        'last_name' : 'D',
        'gender' : 'M',
        'sexual_preference' : 'F',
        'birth_date' : '2000-04-10',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'google.png',
        'tag_ids' : [4, 8, 6, 10, 3]
    },
    {
        'name': 'chafik',
        'pass' : password,
        'email' : 'chafik@gmail.com',
        'first_name' : 'Chafik',
        'last_name' : 'T',
        'gender' : 'M',
        'sexual_preference' : 'F',
        'birth_date' : '1980-04-10',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'pizza.png',
        'tag_ids' : [4, 8]
    },
    {
        'name': 'naruto',
        'pass' : password,
        'email' : 'naruto@gmail.com',
        'first_name' : 'Naruto',
        'last_name' : 'Uzumaki',
        'gender' : 'M',
        'sexual_preference' : 'F',
        'birth_date' : '1988-05-11',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'naruto.png',
        'tag_ids' : [2, 6, 7, 9, 3]
    },
    {
        'name': 'rozhou',
        'pass' : password,
        'email' : 'rozhou@gmail.com',
        'first_name' : 'Romain',
        'last_name' : 'Zhou',
        'gender' : 'M',
        'sexual_preference' : 'F',
        'birth_date' : '2002-08-01',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'panda.jpeg',
        'tag_ids' : [1, 6, 2, 10]
    },
    {
        'name': 'jinx',
        'pass' : password,
        'email' : 'jinx@gmail.com',
        'first_name' : 'Jinx',
        'last_name' : 'Arcane',
        'gender' : 'F',
        'sexual_preference' : 'M',
        'birth_date' : '1999-04-10',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'jynx.jpeg',
        'tag_ids' : [1, 5, 3, 4, 8]
    },
    {
        'name': 'vi',
        'pass' : password,
        'email' : 'vi@gmail.com',
        'first_name' : 'Vi',
        'last_name' : 'Arcane',
        'gender' : 'F',
        'sexual_preference' : 'F',
        'birth_date' : '1996-04-10',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'fame_rating' : '2.5',
        'image_name' : 'vi.png',
        'tag_ids' : [1, 5, 6]
    }
]



user_id = 1
for user in users:
    cur.execute("INSERT INTO user (username, pass, email, first_name, last_name,gender, sexual_preference, birth_date, latitude, longitude, is_activated, fame_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (user['name'], user['pass'],user['email'], user['first_name'], user['last_name'], user['gender'], user['sexual_preference'], user['birth_date'], user['latitude'], user['longitude'], "1", user['fame_rating']))
    image_name = './pictures/' + user['image_name']
    with open(image_name, "rb") as file:
        file_content = file.read()
        imageNameSplit = user['image_name'].split('.')
        image_name = imageNameSplit[0]
        mime_type = f"image/{imageNameSplit[1]}"
        encoded_content = base64.b64encode(file_content)
    cur.execute("INSERT INTO image (image_file, user_id, is_profile_picture, file_name, mime_type) VALUES (?, ?, ?, ?, ?)",
                ((encoded_content), str(user_id), str(1), image_name, mime_type))
    
    for i in user['tag_ids']:
         cur.execute("INSERT INTO user_tag (user_id, tag_id) VALUES (?, ?)",
                (str(user_id), str(i)))

    user_id += 1

connection.commit()
connection.close()
