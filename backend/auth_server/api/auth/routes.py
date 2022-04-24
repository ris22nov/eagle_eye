from importlib.metadata import packages_distributions
import profile
from flask import Blueprint,request,jsonify
from flask_jwt_extended import create_access_token,create_refresh_token,jwt_required,get_jwt_identity,set_refresh_cookies,unset_refresh_cookies
from .models import User,db


bp = Blueprint('auth', __name__)

@bp.route('/register', methods = ['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    name = request.json.get('name')
    designation = request.json.get('designation')
    dpcd = request.json.get('dpcd')
    role = request.json.get('role')
    if username is None or password is None:
        return jsonify({'Message': "Please Provide a valid User Name & Password"}), 400 # user or Password Not Provided
    if User.query.filter_by(username = username).first() is not None:
        return jsonify({'Message': "User Already Exist"}), 400 # existing user
    user = User(username = username)
    user.hash_password(password)
    user.name  =  name
    user.designation =  designation
    user.dpcd  =  dpcd
    user.role  =  role
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username }), 201 

@bp.route('/login', methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username = username).first()
    if not user or not user.verify_password(password):
        response = jsonify({"error":"Unauthorised Access"}),401
    else:
        accessToken = create_access_token(identity=username,fresh=True)
        refreshToken = create_refresh_token(identity=username)
        profile = {"username":user.username,"name":user.name,"designation":user.designation,"dpcd":user.dpcd,"role":user.role}
        response = jsonify({"accessToken":accessToken,"profile":profile})
        set_refresh_cookies(response,refreshToken,max_age=86400)
    return response

@bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout Successfull"})
    unset_refresh_cookies(response)
    return response

@bp.route('/refresh', methods=["POST"])
@jwt_required(refresh=True,locations=['cookies'])
def refresh_access_token():
    identity = get_jwt_identity()
    accessToken = create_access_token(identity=identity, fresh=False)
    user = User.query.filter_by(username = identity).first()
    profile = {"username":user.username,"name":user.name,"designation":user.designation,"dpcd":user.dpcd,"role":user.role}
    return jsonify({"accessToken":accessToken,"profile":profile})