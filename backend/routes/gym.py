from flask import Blueprint, jsonify, request, g
from bson import ObjectId
from extensions.db import get_db
from extensions.authentication import login_required
from schemas.gym import gymSchema
import jsonschema

gym = Blueprint('gym', __name__)
@gym.route('/gyms', methods=['POST'])
@login_required  
def create_gym():
    gym_data = request.get_json()

    db = get_db()

    gym_collection = db.get_collection("gym")

    existing_gym = gym_collection.find_one({"address": gym_data["address"]})

    if existing_gym is not None:
        return jsonify({"error": "Já existe uma academia neste endereço"}), 400
    else:
        try:
            jsonschema.validate(gym_data, gymSchema)
        except jsonschema.exceptions.ValidationError as err:
            return jsonify({'message': 'Dados de academia inválidos', 'erro': str(err)}), 400

        owner_id = g.current_owner['_id']

        gym_data['owner_id'] = owner_id

        result = gym_collection.insert_one(gym_data)

        if result.acknowledged:
            inserted_id = str(result.inserted_id)
            return jsonify({"message": f"Academia cadastrada com sucesso", "id": inserted_id}), 201
        else:
            return jsonify({"error": "Erro ao cadastrar academia"}), 500

@gym.route('/gyms/<gym_id>', methods=['PUT'])
@login_required
def update_gym(gym_id):
    gym_data = request.get_json()

    db = get_db()

    gym_collection = db.get_collection("gym")

    existing_gym = gym_collection.find_one({"_id": ObjectId(gym_id), "owner_id": g.current_owner['_id']})

    if existing_gym is None:
        return jsonify({"error": "Academia não encontrada"}), 404

    try:
        jsonschema.validate(gym_data, gymSchema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados de academia inválidos', 'erro': str(err)}), 400

    result = gym_collection.update_one({"_id": ObjectId(gym_id)}, {"$set": gym_data})

    if result.modified_count > 0:
        return jsonify({"message": "Dados da academia atualizados com sucesso"}), 200
    else:
        return jsonify({"error": "Falha ao atualizar dados da academia"}), 500

@gym.route('/gyms/<gym_id>', methods=['DELETE'])
@login_required
def delete_gym(gym_id):
    db = get_db()
    gym_collection = db.get_collection("gym")

    existing_gym = gym_collection.find_one({"_id": ObjectId(gym_id)})
    if not existing_gym:
        return jsonify({"error": "Academia não encontrada"}), 404
    
    owner_id = g.current_owner['_id']
    if owner_id != existing_gym['owner_id']:
        return jsonify({"error": "Você não tem permissão para excluir esta academia"}), 403

    result = gym_collection.delete_one({"_id": ObjectId(gym_id)})

    if result.deleted_count == 1:
        return jsonify({"message": "Academia excluída com sucesso"}), 200
    else:
        return jsonify({"error": "Erro ao excluir academia"}), 500