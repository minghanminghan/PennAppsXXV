# flask/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

class Statement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    description = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(100), nullable=True)
    sub_category = db.Column(db.String(100), nullable=True)
    amount = db.Column(db.Float, nullable=False)
    balance = db.Column(db.Float, nullable=False)

    user = db.relationship('User', backref=db.backref('statements', lazy=True))

    def __repr__(self):
        return f'<Statement {self.id} - User {self.user_id} - Amount {self.amount} - Balance {self.balance}>'