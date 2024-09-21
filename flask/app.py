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

if __name__ == '__main__':
    app.run(debug=True)

# Load configuration
app.config.from_object('config.Config')

# # Initialize SQLAlchemy
# db.init_app(app)

# Register Blueprints
app.register_blueprint(user_views.bp)

# Create the database tables within the app context
# with app.app_context():
#     db.create_all()

if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=True)