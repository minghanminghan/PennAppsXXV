# import flast module
from flask import Flask
import os
import categorize as cat

# instance of flask application
app = Flask(__name__)

# home route that returns below text when root url is accessed
@app.route("/")
def hello_world():
    df = cat.csv_to_df('../data/2024.csv')
    return f"<p>cwd: {os.getcwd()}</p><br><p>df: {df.head()}</p>"

if __name__ == '__main__':  
   app.run()