from flask import Flask
from flask_cors import CORS, cross_origin
from models import db
from views import user_views
import categorize as cat
import analyze as anal
import json
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load configuration
app.config.from_object('config.Config')

# Initialize SQLAlchemy
db.init_app(app)

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
    # Run the Flask application
    app.run(debug=True)