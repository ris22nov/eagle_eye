from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost/canpro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'userDetails'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(10), unique=True, nullable=False)
    password = db.Column(db.String(256))
    name = db.Column(db.String(128), nullable=False)
    designation = db.Column(db.String(20),nullable = False)
    dpcd = db.Column(db.Integer, nullable=False)
    role = db.Column(db.JSON, nullable=False)
    created_on = db.Column(db.DateTime, default=db.func.now())
    updated_on = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

if __name__ == '__main__':
    db.create_all()
