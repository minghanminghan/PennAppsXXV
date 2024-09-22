# import flast module
from flask import Flask
import os
import categorize as cat

# instance of flask application
app = Flask(__name__)

# home route that returns below text when root url is accessed
@app.route("/")
def hello_world():

    return "<p>Hello World!</p>"

@app.route("/data")
def get_data():
    df = cat.csv_to_df('../data/2024.csv') # for now, implement data upload + conversion in the future
    return df.to_json()

if __name__ == '__main__':  
   app.run()