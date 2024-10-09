import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO user (username, pass, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            ('user1', 'pass','adam@gmail.com', 'Adam', 'pass')
            )

# cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
#             ('Second Post', 'Content for the second post')
#             )

connection.commit()
connection.close()
