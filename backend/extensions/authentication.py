from functools import wraps
from flask import request, jsonify, g, current_app as app
import jwt
from bson import ObjectId
from extensions.db import get_db

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Token de autenticação não fornecido"}), 401

        token = auth_header.split('Bearer ')[1]

        try:
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            owner_id = ObjectId(decoded_token['id'])
            email = decoded_token['email']

            db = get_db()
            owner_collection = db.get_collection("owner")
            owner = owner_collection.find_one({"_id": owner_id, "email": email})

            if not owner:
                return jsonify({"error": "Proprietário não encontrado"}), 401

            g.current_owner = owner

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated_function
