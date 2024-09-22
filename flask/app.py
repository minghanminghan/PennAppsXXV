from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from views import user_views

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
app.config.from_object(Config)

# Initialize SQLAlchemy and Migrate without passing the app
db = SQLAlchemy()
migrate = Migrate()

# Bind the db and migrate instances to the app
db.init_app(app)
migrate.init_app(app, db)

from models import User, Statement  # Import your models

# Register Blueprints
app.register_blueprint(user_views.bp)

if __name__ == '__main__':
    app.run(debug=True)