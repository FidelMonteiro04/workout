from flask import Blueprint, jsonify, request, g
from bson import ObjectId
from extensions.db import get_db
from extensions.authentication import login_required
import jsonschema
from schemas.product import product_Schema

product = Blueprint('product', __name__)

@product.route('/stores/<store_id>/products', methods=['GET'])
@login_required
def get_products(store_id):
    db = get_db()
    product_collection = db.get_collection("product")

    products_finder = product_collection.find({ "store_id": ObjectId(store_id) })
    
    products = []

    for product in products_finder:
        product["_id"] = str(product["_id"])
        product["store_id"] = str(product["store_id"])
        products.append(product)
    print(products)
    
    if products is None: return jsonify({ "error": "Não existem produtos cadastrados!"})

    return jsonify({ "message": "Sucesso na busca de produtos!","products": products })

@product.route('/stores/<store_id>/products', methods=['POST'])
@login_required
def create_product(store_id):
    product_data = request.get_json()

    db = get_db()
    store_collection = db.get_collection("store")

    existing_store = store_collection.find_one({"_id": ObjectId(store_id)})
    if not existing_store:
        return jsonify({"error": "Loja não encontrada"}), 404

    try:
        jsonschema.validate(product_data, product_Schema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados do produto inválidos', 'error': str(err)}), 400

    product_data['store_id'] = ObjectId(store_id)

    product_collection = db.get_collection("product")
    result = product_collection.insert_one(product_data)

    if result.acknowledged:
        inserted_id = str(result.inserted_id)
        return jsonify({"message": f"Produto cadastrado com sucesso", "id": inserted_id}), 201
    else:
        return jsonify({"error": "Erro ao cadastrar produto"}), 500
    
@product.route('/stores/<store_id>/products/<product_id>', methods=['PUT'])
@login_required
def update_product(store_id, product_id):
    product_data = request.get_json()

    db = get_db()

    store_collection = db.get_collection("store")

    store = store_collection.find_one({"_id": ObjectId(store_id)})

    if store is None:
        return jsonify({"error": "Loja não encontrada"}), 404

    product_collection = db.get_collection("product")

    existing_product = product_collection.find_one({"_id": ObjectId(product_id), "store_id": store_id})

    if existing_product is None:
        return jsonify({"error": "Produto não encontrado"}), 404

    try:
        jsonschema.validate(product_data, product_Schema)
    except jsonschema.exceptions.ValidationError as err:
        return jsonify({'message': 'Dados do produto inválidos', 'error': str(err)}), 400

    product_collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})

    return jsonify({"message": "Produto atualizado com sucesso"}), 200

@product.route('/stores/<store_id>/products/<product_id>', methods=['DELETE'])
@login_required
def delete_product(store_id, product_id):
    db = get_db()

    store_collection = db.get_collection("store")

    store = store_collection.find_one({"_id": ObjectId(store_id)})

    if store is None:
        return jsonify({"error": "Loja não encontrada"}), 404

    product_collection = db.get_collection("product")

    existing_product = product_collection.find_one({"_id": ObjectId(product_id), "store_id": store_id})

    if existing_product is None:
        return jsonify({"error": "Produto não encontrado"}), 404

    product_collection.delete_one({"_id": ObjectId(product_id)})

    return jsonify({"message": "Produto excluído com sucesso"}), 200