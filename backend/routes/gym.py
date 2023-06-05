from flask import Blueprint, jsonify, request
from extensions.db import get_db
from schemas.gym import gymSchema
import jsonschema

gym = Blueprint('gym', __name__)


@gym.route('/gyms', methods=['POST'])
def create_gym():
    gym_data = request.get_json()

    db = get_db()

    gym_collection = db.get_collection("gym")

    existing_gym = gym_collection.find_one({"cnpj": gym_data["cnpj"]})

    if existing_gym is not None:
        return jsonify({"error": "Já existe uma academia com esse CNPJ"}), 400
    else:
        try:
            jsonschema.validate(gym_data, gymSchema)
        except jsonschema.exceptions.ValidationError as err:
            return jsonify({'message': 'Dados de academia inválidos', 'erro': str(err)}), 400

        result = gym_collection.insert_one(gym_data)

        if result.acknowledged:
            inserted_id = str(result.inserted_id)
            return jsonify({"message": f"Academia cadastrada com sucesso", "id": inserted_id}), 201
        else:
            return jsonify({"error": "Erro ao cadastrar academia"}), 500