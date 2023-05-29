from flask_pymongo import pymongo


CONNECTION_STRING = "mongodb+srv://workout:WGQb34JuE6mG0jle@cluster0.vy4mzcd.mongodb.net/?retryWrites=true&w=majority"

client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database("workout")
admins_collection = pymongo.collection.Collection(db, "admins")
