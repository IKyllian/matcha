from app import createApp

app = createApp()
if (__name__ == "__main__"):
    app.run(host="10.11.11.1", port="3000", debug=True)
