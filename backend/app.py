from flask import Flask
from routes.admin import admin
from routes.gym import gym
from extensions.db import init_app

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "123456789"
    init_app(app)
    app.register_blueprint(admin)
    app.register_blueprint(gym)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
