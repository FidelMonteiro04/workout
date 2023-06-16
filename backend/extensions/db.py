from flask_pymongo import PyMongo
import pymongo
import os
from dotenv import load_dotenv
from schemas.owner import ownerSchema

load_dotenv()

db = None
user = os.getenv("DB_USERNAME")
password = os.getenv("DB_USER_PASSWORD")

def init_app(app):
    global db

    app.config['MONGO_URI'] = f"mongodb+srv://{user}:{password}@cluster0.vy4mzcd.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(app.config['MONGO_URI'])
    db = client.get_database("workout")
    

def get_db():
    return db