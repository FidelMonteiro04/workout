from flask import Blueprint, request, jsonify
from extensions.db import db
import pymongo
import jsonschema
from schemas.owner import OwnerSchema
from werkzeug.security import generate_password_hash

admin = Blueprint('admin', __name__)

@admin.route('/register', methods=['POST'])
def register():
    owner_data_list = request.get_json()

    try:
        for owner_data in owner_data_list:
            jsonschema.validate(owner_data, OwnerSchema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados de proprietário inválidos', 'erro': str(err)}), 400

    owner_collection = pymongo.collection.Collection(db, 'owner')

    for owner_data in owner_data_list:
        existing_owner = owner_collection.find_one({"email": owner_data["email"]})

        if existing_owner is not None:
            return jsonify({"error": "Já existe um proprietário com esse email"}), 400
        else:
            hashed_password = generate_password_hash(owner_data["password"], method='sha256')
            owner_data["password"] = hashed_password

            result = owner_collection.insert_one(owner_data)

            if result.acknowledged:
                return jsonify({"message": "Proprietário cadastrado com sucesso"}), 201
            else:  
                return jsonify({"error": "Erro ao cadastrar proprietário"}), 500
