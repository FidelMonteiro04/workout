from flask import Flask, request

app = Flask(__name__)

from db import db

@app.route('/')
def index():
    return "index"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    db.get_collection("admins").insert_one(data)
    
    return "User created"


if __name__ == "__main__":
    app.run(debug=True)