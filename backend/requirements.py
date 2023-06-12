import subprocess

packages = [
    'flask',
    'flask_pymongo',
    'jsonschema',
    'PyJWT',
    'Werkzeug',
    "flask-cors"
]

for package in packages:
    subprocess.call(['pip', 'install', package])
