from schemas.owner import ownerSchema

gymSchema = {
    'type': 'object',
    'required': ['cnpj', 'name', 'owner', 'airconditioner', 'personal', 'minorPlan', 'biggerPlan','acessilibility'],
    'properties': {
        'cnpj': {
            'type': 'string',
            'length': 14,
            'unique': True
            },
        'name': {
            'type': 'string'
        },
        'owner': {
            '$ref': 'ownerSchema'
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
        'acessilibility': {
            'type': 'boolean'
        },
    },
    'definitions': {
        'ownerSchema': ownerSchema
        }
}
