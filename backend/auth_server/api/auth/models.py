from authserver import db
import hashlib

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
    
    def hash_password(self, password):
        byte_input = password.encode()
        hash_object = hashlib.sha256(byte_input)
        self.password = hash_object.hexdigest()

    def verify_password(self, password):
        byte_input = password.encode()
        hash_object = hashlib.sha256(byte_input)
        if hash_object.hexdigest() == self.password:
            return True
        else:
            return False