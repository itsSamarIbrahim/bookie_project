from flask import Blueprint, request, jsonify, session
from bookie_backend.models import db, User
from bookie_backend import bcrypt

main = Blueprint('main', __name__)

@main.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # Validate input
        if not username or not email or not password or not confirm_password:
            return jsonify({'error': 'All fields are required'}), 400

        if password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400

        if len(password) < 8 or not any(char.isdigit() for char in password) or not any(char.isupper() for char in password) or not any(char.islower() for char in password) or not any(char in '!@#$%^&*(),.?":{}|<>' for char in password):
            return jsonify({'error': 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a symbol'}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new user
        new_user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@main.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Validate input
        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400

        # Retrieve user from database
        user = User.query.filter_by(username=username).first()

        # Check if user exists and verify password
        if user is None or not user.check_password(password):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Store user id in session
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200

    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500