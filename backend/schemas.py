import db
from ownerSchema import ownerSchema

db.db.create_collection("owner", validator = ownerSchema)