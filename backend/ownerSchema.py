
ownerSchema = {
    'bsonType': 'object',
    'required': ['name', 'email', "cellphone" , "coordinate", "password"],
    'properties': {
        'name': {
            'bsonType': 'string'
        },
        'email': {
            'bsonType': 'string',
            'pattern': '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
            "unique": True
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
            "bsonType": 'string',
            "pattern": "^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>|\[\]\\\/]).*$"
            
        }
    }
}