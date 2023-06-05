from flask_pymongo import PyMongo
import pymongo
from schemas.owner import ownerSchema

db = None

def init_app(app):
    global db

    app.config['MONGO_URI'] = "mongodb+srv://workout:WGQb34JuE6mG0jle@cluster0.vy4mzcd.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(app.config['MONGO_URI'])
    db = client.get_database("workout")
    

def get_db():
    return db