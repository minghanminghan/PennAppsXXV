from flask import Flask
from flask_cors import CORS, cross_origin
from models import db
from views import user_views
import categorize as cat
import analyze as anal
import json
import pandas as pd
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


# Create the database tables within the app context
with app.app_context():
    db.create_all()

# Routes
@app.route("/")
@cross_origin()
def render():
    return "app is running!"

@app.route("/data")
@cross_origin()
def get_data():
    df = cat.csv_to_df('../data/2024.csv') # for now, implement data upload + conversion in the future
    return df.to_json()

@app.route("/analyze")
@cross_origin()
def get_analysis():
    df = anal.analyze()
    return json.dumps(df)

if __name__ == '__main__':
    app.run(debug=True)