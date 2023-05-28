import subprocess

packages = [
    'flask',
    'flask_pymongo',
    'marshmallow',
    'bson',
]

for package in packages:
    subprocess.call(['pip', 'install', package])
