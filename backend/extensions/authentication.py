from flask import request, jsonify, g, current_app as app
import jwt
from extensions.db import get_db

def login_required(f):
    def decorated_function(*args, **kwargs):
        # Obter o token de autenticação do cabeçalho da solicitação
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({"error": "Token de autenticação não fornecido"}), 401

        try:
            # Decodificar o token usando a chave secreta
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            owner_id = decoded_token['id']
            email = decoded_token['email']

            # Obter os dados do proprietário a partir do ID
            db = get_db()
            owner_collection = db.get_collection("owner")
            owner = owner_collection.find_one({"_id": owner_id, "email": email})

            if not owner:
                return jsonify({"error": "Proprietário não encontrado"}), 401

            # Armazenar os dados do proprietário no objeto g para acesso posterior
            g.current_owner = owner

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    decorated_function.__name__ = f.__name__
    return decorated_function
