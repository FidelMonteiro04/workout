product_Schema = {
    "type": "object",
    "required": ["name", "price", "description", "image","category"],
    "properties": {
        "name": {
            "type": "string",
    },
        "price": {  
            "type": "number",
    },
        "description": {
            "type": "string",
    },
        "image": {
            "type": "string",
    },
        "category": {
            "type": "string",
    },
    "distributor": {
            "type": "string",
    },
    }
}