import sqlite3
import bcrypt

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO user (username, pass, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            ('user1', bcrypt.generate_password_hash('pass'),'adam@gmail.com', 'Adam', 'C')
            )

cur.execute("INSERT INTO user (username, pass, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            ('user2', bcrypt.generate_password_hash('pass'),'kyllian@gmail.com', 'Kyllian', 'last')
            )

connection.commit()
connection.close()
