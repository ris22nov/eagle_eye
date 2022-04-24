from webbrowser import get
from flask import Blueprint
from flask_jwt_extended import jwt_required,get_jwt_identity
from datetime import datetime

bp = Blueprint('user', __name__)

@bp.route('/data')
@jwt_required()
def my_profile():
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    response_body = {
        "identity":get_jwt_identity(),
        "time":dt_string
    }
    return response_body