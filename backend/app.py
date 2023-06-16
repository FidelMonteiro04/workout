from flask import Flask
from flask_cors import CORS
from routes.admin import admin
from routes.gym import gym
from routes.plan import plan
from routes.store import store
from routes.product import product
from extensions.db import init_app
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    init_app(app)
    app.register_blueprint(admin)
    app.register_blueprint(plan)
    app.register_blueprint(gym)
    app.register_blueprint(store)
    app.register_blueprint(product)
    CORS(app, origins="*")
    return app

app = create_app()
