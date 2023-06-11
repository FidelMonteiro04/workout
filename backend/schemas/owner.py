ownerSchema = {
    'type': 'object',
    'required': ['name', 'email', 'cnpj', "cellphone" , "password"],
    'properties': {
        'name': {
            'type': 'string'
        },
        'email': {
            'type': 'string',
            'pattern': '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
            "unique": True
        },
        'cnpj': {
            'type': 'string',
            'min': 14,
            'max': 14,
            "unique": True
        },
        "password": {
            "type": 'string',
            "min": 8,
            "pattern": "^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>|\[\]\\\/]).*$"

        },
        "cellphone": {
            "type": 'string',
            "min": 11,
        },
        "rating": {
            "type": 'number',
        },
        "instagram": {
            "type": 'string',
            "unique": True,
        },
    }
}