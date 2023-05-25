from marshmallow import Schema, fields, validate
import uuid

class PlanSchema(Schema):
    id = fields.UUID(default=uuid.uuid4, required=True)
    value = fields.Float(required=True, validate=validate.Range(min=0))
    days = fields.Integer(required=True, validate=validate.Range(min=1))
    name = fields.String(required=False, validate=validate.Length(min=3, max= 255))
