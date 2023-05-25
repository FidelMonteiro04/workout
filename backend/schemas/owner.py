from marshmallow import Schema, fields, validate
import uuid

class OwnerSchema(Schema):
    id = fields.UUID(default=uuid.uuid4, required=True)
    name = fields.String(required=True, validate=validate.Length(min=3, max= 255))
    email = fields.Email(required=True, validate=validate.Length(min=3, max= 255), unique=True)
    cellphone = fields.String(required=True, validate=validate.Length(min=11, max= 255))
    rating = fields.Float(required=True, validate=validate.Range(min=0, max=5))
    instagram = fields.String(required=True, validate=validate.Length(min=3, max= 255))
    coordinate = fields.String(required=True)
    password = fields.String(required=True, load_only=True, validate=[
        validate.Length(min=8, max=255),
        validate.Regexp(r'^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>|\[\]\\\/]).*$',
                error="A senha deve conter pelo menos um caractere maiúsculo e um caractere especial.")
    ])