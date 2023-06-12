from flask import Blueprint, jsonify, request, g
from bson import ObjectId
from extensions.db import get_db
from extensions.authentication import login_required
import jsonschema
from schemas.plan import plan_Schema

plan = Blueprint('plan', __name__)

@plan.route('/gyms/<gym_id>/plans', methods=['POST'])
@login_required
def create_plan(gym_id):
    plan_data = request.get_json()

    db = get_db()
    gym_collection = db.get_collection("gym")

    existing_gym = gym_collection.find_one({"_id": ObjectId(gym_id)})
    if not existing_gym:
        return jsonify({"error": "Academia não encontrada"}), 404

    try:
        jsonschema.validate(plan_data, plan_Schema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados do plano inválidos', 'error': str(err)}), 400

    plan_data['gym_id'] = gym_id

    plan_collection = db.get_collection("plan")
    if isinstance(plan_data, list):
        result = plan_collection.insert_many(plan_data)

        if result.acknowledged:
            inserteds_ids = str(result.inserted_ids)

            return jsonify({"message": f"Plano cadastrado com sucesso", "id": inserted_ids}), 201
        else:
            return jsonify({"error": "Erro ao cadastrar plano"}), 500
    else:
        result = plan_collection.insert_one(plan_data)

        if result.acknowledged:
            inserted_id = str(result.inserted_id)
            return jsonify({"message": f"Plano cadastrado com sucesso", "id": inserted_id}), 201
        else:
            return jsonify({"error": "Erro ao cadastrar plano"}), 500
    
@plan.route('/gyms/<gym_id>/plans/<plan_id>', methods=['PUT'])
@login_required
def update_plan(gym_id, plan_id):
    plan_data = request.get_json()

    db = get_db()

    gym_collection = db.get_collection("gym")

    gym = gym_collection.find_one({"_id": ObjectId(gym_id)})

    if gym is None:
        return jsonify({"error": "Academia não encontrada"}), 404

    plan_collection = db.get_collection("plan")

    existing_plan = plan_collection.find_one({"_id": ObjectId(plan_id), "gym_id": gym_id})

    if existing_plan is None:
        return jsonify({"error": "Plano não encontrado"}), 404

    try:
        jsonschema.validate(plan_data, plan_Schema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados do plano inválidos', 'erro': str(err)}), 400

    plan_collection.update_one({"_id": ObjectId(plan_id)}, {"$set": plan_data})

    return jsonify({"message": "Plano atualizado com sucesso"}), 200

@plan.route('/gyms/<gym_id>/plans/<plan_id>', methods=['DELETE'])
@login_required
def delete_plan(gym_id, plan_id):
    db = get_db()
    gym_collection = db.get_collection("gym")

    gym = gym_collection.find_one({"_id": ObjectId(gym_id), "owner_id": g.current_owner["_id"]})
    if not gym:
        return jsonify({"error": "Academia não encontrada ou não autorizada"}), 404

    plan_collection = db.get_collection("plan")

    result = plan_collection.delete_one({"_id": ObjectId(plan_id), "gym_id": gym_id})

    if result.deleted_count > 0:
        return jsonify({"message": "Plano removido com sucesso"}), 200
    else:
        return jsonify({"error": "Falha ao remover o plano"}), 500