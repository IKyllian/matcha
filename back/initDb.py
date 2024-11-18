import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO user (username, pass, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            ('user1', 'pass','adam@gmail.com', 'Adam', 'C')
            )

cur.execute("INSERT INTO user (username, pass, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            ('user2', 'pass','kyllian@gmail.com', 'Kyllian', 'last')
            )

connection.commit()
connection.close()
