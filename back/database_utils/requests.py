import sqlite3

def makeRequest(query, params = ()):
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row

    # print("makeRequest Params = " + params)


    cur = connection.cursor()

    response = cur.execute(query, params)
    # print("makeRequest Response = " + response)

    rows = response.fetchall()
    # print("makeRequest Rows = " + rows)
    unpacked = [{k: item[k] for k in item.keys()} for item in rows]

    connection.commit()
    connection.close()
    return unpacked
