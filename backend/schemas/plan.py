plan_Schema = {
    "oneOf": [
        {
            "type": "object",
        "required": ["price", "days"],
        "properties": {
            "price": { 
                "type": "string",
            },
            "days": {  
                "type": "number",
                },
            }
        },
        {
            "type": "array",
            "items": {
                "type": "object",
        "required": ["price", "days"],
        "properties": {
            "price": { 
                "type": "string",
            },
            "days": {  
                "type": "number",
                },
            }
            }
        }
    ]
}