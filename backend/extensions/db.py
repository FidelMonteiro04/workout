from flask_pymongo import PyMongo
import pymongo

mongo = PyMongo()
CONNECTION_STRING = "mongodb+srv://workout:WGQb34JuE6mG0jle@cluster0.vy4mzcd.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database("workout")

def init_app(app):
    mongo.init_app(app)
    return mongo.db

def get_db():
    return mongo.db

