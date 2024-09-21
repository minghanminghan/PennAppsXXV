# flask/views/user_views.py

from flask import Blueprint, jsonify, request, Flask
from models import db, User
from propelauth_flask import init_auth, current_user

bp = Blueprint('user', __name__)


auth = init_auth("https://5085896.propelauthtest.com", "4af01b80173b966b98fd534f588bbc320f4ca4a6931b7ff181aaf37d37b4f9b6c492f59f9ae5a5558cde22339490cb6d")

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

@bp.route("/api/whoami")
@auth.require_user
def who_am_i():
    return {"user_id": current_user.user_id}