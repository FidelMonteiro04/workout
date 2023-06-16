from flask import Blueprint, request, jsonify, g
from extensions.db import get_db
import jsonschema
import jwt
from flask import current_app as app
from schemas.owner import ownerSchema
from extensions.authentication import login_required
from werkzeug.security import generate_password_hash, check_password_hash

admin = Blueprint('admin', __name__)

def owner_exists(collection, key, value):
    existing_owner = collection.find_one({key: value})
    return existing_owner is not None

@admin.route('/register', methods=['POST'])
def register():
    owner_data = request.get_json()

    try:
        jsonschema.validate(owner_data, ownerSchema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados de proprietário inválidos', 'erro': str(err)}), 400

    db = get_db()
    owner_collection = db.get_collection("owner")

    if owner_exists(owner_collection, "email", owner_data["email"]):
        return jsonify({"error": "Já existe um proprietário com esse email"}), 400

    if owner_exists(owner_collection, "cnpj", owner_data["cnpj"]):
        return jsonify({"error": "Já existe um proprietário com esse CNPJ"}), 400
    
    hashed_password = generate_password_hash(owner_data["password"], method='pbkdf2:sha256', salt_length=12)
    owner_data["password"] = hashed_password

    result = owner_collection.insert_one(owner_data)

    if result.acknowledged:
        inserted_id = str(result.inserted_id)
        token = jwt.encode({'id': inserted_id, 'email': owner_data['email']}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({"message": f"Proprietário cadastrado com sucesso", "token": token}), 201
    else:
        return jsonify({"error": "Erro ao cadastrar proprietário"}), 500


@admin.route('/login', methods=['POST'])
def login():
    owner_data = request.get_json()

    db = get_db()
    owner_collection = db.get_collection("owner")

    existing_owner = owner_collection.find_one({"email": owner_data["email"]})
    if existing_owner is None: return jsonify({"error": "Não há usuário com esse email"}), 400

    if not check_password_hash(existing_owner["password"], owner_data["password"]): return jsonify({"error": "Senha incorreta"}), 400

    token = jwt.encode ({'id': str(existing_owner["_id"]), 'email': existing_owner['email'] }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({"message": "Login realizado com sucesso", "token": token, "ownType": existing_owner["ownType"]}), 200

@admin.route('/owners', methods=['GET'])
@login_required
def get_owner():
    db = get_db()

    owner_collection = db.get_collection("owner")
    owner = owner_collection.find_one({ "_id":  g.current_owner["_id"] })

    owner["_id"] = str(owner["_id"])
    del owner["password"]

    if owner is None: return jsonify({"error": "Não há usuário!"}), 400

    return jsonify({"message": "Dados de admin!", "owner": owner}), 200

@admin.route('/owners', methods=['PUT'])
@login_required
def update_owner():
    owner_data = request.get_json()
    db = get_db()

    owner_collection = db.get_collection("owner")
    owner = owner_collection.update_one({ "_id":  g.current_owner["_id"] }, { "$set": owner_data })

    if owner is None: return jsonify({"error": "Não há usuário!"}), 400

    return jsonify({"message": "Dados atualizados do admin!"}), 200
