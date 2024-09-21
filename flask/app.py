from flask import Flask
from models import db
from views import user_views

# Initialize Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object('config.Config')

# Initialize SQLAlchemy
db.init_app(app)

# Register Blueprints
app.register_blueprint(user_views.bp)

# Create the database tables within the app context
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=True)