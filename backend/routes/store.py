from flask import Blueprint, jsonify, request, g
from bson import ObjectId
from extensions.db import get_db
from extensions.authentication import login_required
import jsonschema
from schemas.store import store_Schema

store = Blueprint('store', __name__)

@store.route("/stores", methods=['GET'])
@login_required
def get_stores():
    db = get_db()

    store_collection = db.get_collection('store')

    store = store_collection.find_one({ "owner_id": g.current_owner["_id"] })

    if store is None: return jsonify({"error": "Esse usuário não possui nenhuma academia cadastrada!"})

    store["_id"] = str(store["_id"])
    store["owner_id"] = str(store["owner_id"])

    return jsonify({"message": "Loja acessada com sucesso!", "store": store})

@store.route('/stores', methods=['POST'])
@login_required
def create_store():
    store_data = request.get_json()

    db = get_db()

    store_collection = db.get_collection("store")

    existing_store = store_collection.find_one({"address": store_data["address"]})

    if existing_store is not None:
        return jsonify({"error": "Já existe uma loja neste endereço"}), 400
    else:
        try:
            jsonschema.validate(store_data, store_Schema)
        except jsonschema.exceptions.ValidationError as err:
            return jsonify({'message': 'Dados de loja inválidos', 'erro': str(err)}), 400

        owner_id = g.current_owner['_id']

        store_data['owner_id'] = owner_id

        result = store_collection.insert_one(store_data)

        if result.acknowledged:
            inserted_id = str(result.inserted_id)
            return jsonify({"message": f"Loja cadastrada com sucesso", "id": inserted_id}), 201
        else:
            return jsonify({"error": "Erro ao cadastrar loja"}), 500
        
@store.route('/stores/<store_id>', methods=['PUT'])
@login_required
def update_store(store_id):
    store_data = request.get_json()

    db = get_db()

    store_collection = db.get_collection("store")

    existing_store = store_collection.find_one({"_id": ObjectId(store_id), "owner_id": g.current_owner['_id']})

    if existing_store is None:
        return jsonify({"error": "Loja não encontrada"}), 404

    try:
        jsonschema.validate(store_data, store_Schema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados de loja inválidos', 'erro': str(err)}), 400

    result = store_collection.update_one({"_id": ObjectId(store_id)}, {"$set": store_data})

    if result.acknowledged:
        return jsonify({"message": "Loja atualizada com sucesso"}), 200
    else:
        return jsonify({"error": "Erro ao atualizar loja"}), 500

@store.route('/stores/<store_id>', methods=['DELETE'])
@login_required
def delete_store(store_id):
    db = get_db()

    store_collection = db.get_collection("store")

    existing_store = store_collection.find_one({"_id": ObjectId(store_id), "owner_id": g.current_owner['_id']})

    if existing_store is None:
        return jsonify({"error": "Loja não encontrada"}), 404

    result = store_collection.delete_one({"_id": ObjectId(store_id)})

    if result.acknowledged:
        return jsonify({"message": "Loja deletada com sucesso"}), 200
    else:
        return jsonify({"error": "Erro ao deletar loja"}), 500