from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from models import db, User
import logging

bp = Blueprint('login', __name__)

logging.basicConfig(level=logging.INFO)

@bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400

        user = User.query.filter_by(username=username).first()

        if user is None or not check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid username or password'}), 401

        session['user_id'] = user.id
        logging.info(f"User {username} logged in successfully.")
        return jsonify({'message': 'Login successful'}), 200

    except Exception as e:
        logging.error(f"Login failed: {str(e)}")
        return jsonify({'error': 'Login failed'}), 500
