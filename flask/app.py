from flask import Flask
from models import db
from views import user_views
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import User, Statement  # Import your models

# Register Blueprints
app.register_blueprint(user_views.bp)

if __name__ == '__main__':
    app.run(debug=True)