from flask_pymongo import PyMongo


mongo = PyMongo()


def init_app(app):
    app.config["MONGO_URI"] = "mongodb+srv://fidelmonteiro05:UsjgHEdudQDygrnj@cluster0.vy4mzcd.mongodb.net/workout"
    return mongo.init_app(app)




