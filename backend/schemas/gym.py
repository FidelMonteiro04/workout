from schemas.owner import ownerSchema

gymSchema = {
    'type': 'object',
    'required': ['name', 'airconditioner', 'personal','accessibility', "contact", 'lat', 'lng', 'address'],
    'properties': {
        'name': {
            'type': 'string'
        },
        'airconditioner': {
            'type': 'boolean'
        },
        'personal': {
            'type': 'number'
        },
        'minorPlan': {
            'type': 'number'
        },
        'biggerPlan': {
            'type': 'number'
        },
        'accessibility': {
            'type': 'boolean'
        },
        "lat":{
            "type": 'string',
        },
        'lng': {
            'type': 'string',
        },
        'address': {
            'type': 'string',
        },
        'contact': {
            'type': 'string',
            'unique': True
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
