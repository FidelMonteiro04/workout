from flask import Blueprint, request

user = Blueprint('user', __name__)



@user.route('/')
def index():
    return "index"

@user.route('/login')
def login(): 
    return "login"

@user.route('/register')
def register():
    return "register"
    

@user.route('/logout')
def logout():    
    return "logout"

