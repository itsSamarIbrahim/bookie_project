import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///instance/users.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False