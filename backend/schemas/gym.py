from marshmallow import Schema, fields, validate
from ..schemas.owner import OwnerSchema
from ..schemas.plan import PlanSchema
import uuid

class GymSchema(Schema):
    id = fields.UUID(default=uuid.uuid4, required=True)
    cnpj = fields.String(required=True, validate=validate.Length(equal=14, unique=True))
    name = fields.String(required=True, validate=validate.Length(min=3, max= 255))
    owner = fields.ReferenceField(OwnerSchema, required=True, referencefield='id')
    airConditioning = fields.Boolean(required=True)
    minnorPlan = fields.Integer(required=True)
    biggerPlan = fields.Integer(required=True)
    plans = fields.List(fields.ReferenceField(PlanSchema, required=True, referencefield='id'))
    acessibility = fields.Boolean(required=True)
    personal = fields.Integer(required=True, min=1)
    thumbnail = fields.String(required=True, max=255, unique=True)