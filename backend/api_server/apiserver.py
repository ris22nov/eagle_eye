from flask import Flask,json,jsonify
from pkgutil import walk_packages
from importlib import import_module
from traceback import format_exc
from werkzeug.exceptions import HTTPException
from werkzeug.wrappers import response
import api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

apiserver = Flask(__name__)
apiserver.config.from_object('config.DevConfig')
CORS(apiserver, supports_credentials=True)
jwt = JWTManager(apiserver)
db = SQLAlchemy(apiserver)

for importer, package_name, ispkg in walk_packages(path=api.__path__):
    if ispkg:
        routes = import_module('.routes', api.__name__ + "." + package_name)
        apiserver.register_blueprint(routes.bp, url_prefix="/" + package_name)