from flask import Flask
from routes.admin import admin
from routes.gym import gym
from routes.plan import plan
from routes.store import store
from routes.product import product
from extensions.db import init_app

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "123456789"
    init_app(app)
    app.register_blueprint(admin)
    app.register_blueprint(plan)
    app.register_blueprint(gym)
    app.register_blueprint(store)
    app.register_blueprint(product)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
