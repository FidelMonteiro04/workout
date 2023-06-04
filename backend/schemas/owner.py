import uuid
OwnerSchema = {
    'bsonType': 'object',
    'required': ['name', 'email', "cellphone" , "coordinates", "password"],
    'properties': {
        'id': {
            'bsonType': 'string',
            "default": str(uuid.uuid4())
        },
        'name': {
            'bsonType': 'string'
        },
        'email': {
            'bsonType': 'string',
            'pattern': '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
            "unique": True
        },
        "password": {
            "bsonType": 'string',
            "min": 8,
            "pattern": "^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>|\[\]\\\/]).*$"

        },
        "cellphone": {
            "bsonType": 'string',
            "min": 11,
        },
        "rating": {
            "bsonType": 'double',
        },
        "instagram": {
            "bsonType": 'string',
            "unique": True,
        },
        "coordinates": {
            "bsonType": 'string'
            
        }
    }
}