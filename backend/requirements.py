import subprocess

packages = [
    'flask',
    'flask_pymongo',
    'bson',
    'jsonschema',
    'PyJWT',
    'Werkzeug',
]

for package in packages:
    subprocess.call(['pip', 'install', package])
