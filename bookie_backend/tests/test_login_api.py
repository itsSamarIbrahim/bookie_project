import unittest
from app import app, db
from models import User
from werkzeug.security import generate_password_hash

class LoginAPITestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()
        user = User(username='testuser', email='test@example.com', password_hash=generate_password_hash('password'))
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_login_success(self):
        response = self.app.post('/api/login', json={'username': 'testuser', 'password': 'password'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('Login successful', response.get_json().get('message'))

    def test_login_failure(self):
        response = self.app.post('/api/login', json={'username': 'testuser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 401)
        self.assertIn('Invalid username or password', response.get_json().get('error'))

    def test_missing_username_or_password(self):
        response = self.app.post('/api/login', json={'username': '', 'password': 'password'})
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing username or password', response.get_json().get('error'))

        response = self.app.post('/api/login', json={'username': 'testuser', 'password': ''})
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing username or password', response.get_json().get('error'))

if __name__ == '__main__':
    unittest.main()