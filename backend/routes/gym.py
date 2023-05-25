from flask import Blueprint, jsonify, request
from bson import ObjectId
from ..extensions.db import mongo

gym = Blueprint('gym', __name__)

