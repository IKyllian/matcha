import base64
import sqlite3

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
        'image_name' : 'blank.png',
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
        'image_name' : 'google.png'
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
        'image_name' : 'google.png'
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
        'image_name' : 'pizza.png'
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
        'image_name' : 'naruto.png'
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
        'image_name' : 'panda.jpeg'
    },
    {
        'name': 'jynx',
        'pass' : password,
        'email' : 'jynx@gmail.com',
        'first_name' : 'Jynx',
        'last_name' : 'Arcane',
        'gender' : 'F',
        'sexual_preference' : 'M',
        'birth_date' : '1999-04-10',
        'latitude' : '45.74800109863281',
        'longitude' : '4.849999904632568',
        'image_name' : 'jynx.jpeg'
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
        'image_name' : 'vi.png'
    }
]

user_id = 1
for user in users:
    cur.execute("INSERT INTO user (username, pass, email, first_name, last_name,gender, sexual_preference, birth_date, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (user['name'], user['pass'],user['email'], user['first_name'], user['last_name'], user['gender'], user['sexual_preference'], user['birth_date'], user['latitude'], user['longitude'], ))
    image_name = './pictures/' + user['image_name']
    with open(image_name, "rb") as file:
        file_content = file.read()
        imageNameSplit = user['image_name'].split('.')
        image_name = imageNameSplit[0]
        mime_type = f"image/{imageNameSplit[1]}"
        encoded_content = base64.b64encode(file_content)
    cur.execute("INSERT INTO image (image_file, user_id, is_profile_picture, file_name, mime_type) VALUES (?, ?, ?, ?, ?)",
                ((encoded_content), str(user_id), str(True), image_name, mime_type))
    user_id += 1

connection.commit()
connection.close()
