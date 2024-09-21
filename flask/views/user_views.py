# flask/views/user_views.py

from flask import Blueprint, jsonify, request
from models import db, User

bp = Blueprint('user', __name__)

@bp.route('/user', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"})

@bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [{"id": user.id, "email": user.email, "password": user.password} for user in users]
    return jsonify(users_list)