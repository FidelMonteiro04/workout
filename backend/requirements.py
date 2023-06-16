import subprocess

packages = [
    'flask',
    'flask_pymongo',
    'jsonschema',
    'PyJWT',
    'Werkzeug',
    "flask-cors",
    "python-dotenv",
    "gunicorn"
]

for package in packages:
    subprocess.call(['pip', 'install', package])
