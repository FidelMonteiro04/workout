store_Schema = {
    "type": "object",
    "required": ["image", "name", 'description', "lat", "lng", "address", "contact"],
    "properties": {
        'image': {
            'type': 'string'
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "lat": {
            "type": "string"
        },
        "lng": {
            "type": "string"
        },
        "address": {
            "type": "string"
        },
        "contact": {
            "type": "string",
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