store_Schema = {
    "type": "object",
    "required": ["name", "description", "lat", "lng", "address", "contact"],
    "properties": {
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