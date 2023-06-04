from flask import Flask
from routes.admin import admin
from extensions.db import init_app

def create_app():
    app = Flask(__name__)
    app.config['MONGO_URI'] = 'mongodb+srv://workout:WGQb34JuE6mG0jle@cluster0.vy4mzcd.mongodb.net/?retryWrites=true&w=majority'
    db = init_app(app)
    app.register_blueprint(admin)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
