from flask import Blueprint, jsonify, request
from flask_cors import CORS
from models import db, User
from analyze import sanitize_data,analyze  # Ensure this import is correct
from categorize import parse_csv_data;
import os

bp = Blueprint('user', __name__)
CORS(bp, resources={r"/*": {"origins": "*"}})  # Apply CORS to this Blueprint

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
def who_am_i():
    return {"user_id": "anonymous"}

@bp.route('/api/parsed-data', methods=['POST'])
def get_parsed_data():
    data = request.json
    month = data.get('month')
    if not month:
        return jsonify({"error": "Month parameter is required"}), 400

    file_name = f"{month}.csv"
    if not file_name:
        return jsonify({"error": "Invalid month parameter"}), 400

    base_path = os.path.join(os.path.dirname(__file__), '..', 'data')
    file_path = os.path.join(base_path, file_name)
    print(file_path)
    if not os.path.exists(file_path):
        return jsonify({"error": f"File for month {month} not found"}), 404
    
    

    data = parse_csv_data(file_path)
    return jsonify(data.to_dict(orient='records'))

@bp.route('/api/financial-welness-data', methods=['POST'])
def get_welness_data():
    data = request.json
    month = data.get('month')
    if not month:
        return jsonify({"error": "Month parameter is required"}), 400

    file_name = f"{month}.csv"
    if not file_name:
        return jsonify({"error": "Invalid month parameter"}), 400

    base_path = os.path.join(os.path.dirname(__file__), '..', 'data')
    file_path = os.path.join(base_path, file_name)

    if not os.path.exists(file_path):
        return jsonify({"error": f"File for month {month} not found"}), 404

    data = analyze(file_path)
    sanitized_data = sanitize_data(data)
    return jsonify(sanitized_data)