from os import environ, path
from dotenv import load_dotenv
import datetime

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=1)
    JWT_ALGORITHM = 'RS256'
    JWT_PRIVATE_KEY = open('auth.pem').read()
    JWT_PUBLIC_KEY = open('auth.pub').read()
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_REFRESH_CSRF_HEADER_NAME = "X-CSRF-TOKEN-REFRESH"


class ProdConfig(Config):
    FLASK_ENV = 'production'
    DEBUG = False
    TESTING = False
    #DATABASE_URI = environ.get('PROD_DATABASE_URI')


class DevConfig(Config):
    FLASK_ENV = 'development'
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = environ.get('DEV_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')