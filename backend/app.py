from flask import Flask
from .routes.user import user
from .extensions import db
from .routes.gym import gym

def create_app():
    app = Flask(__name__)
    app.register_blueprint(user)
    app.register_blueprint(gym)
    db.init_app(app)
    return app

