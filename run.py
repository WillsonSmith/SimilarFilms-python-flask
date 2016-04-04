"""
This is the main app for running SimilarFilms. It contains all of the routes for
the application. It is dependent on flask, os, and the locally defined get_data.
"""
import os

from flask import Flask, render_template, send_from_directory
from modules.get_data import get_data

app = Flask(__name__)

API_KEY = os.environ['APIKEY']

@app.route("/")
def index():
    """render the index of SimilarFilms"""
    results = get_data(path="/3/movie/popular?api_key=" + str(API_KEY)).get("results")
    return render_template("index.html", title="Popular Films", results=results)

@app.route("/similar/<int:movie_id>")
def similar(movie_id):
    """render /similar/#"""
    results = get_data(path='/3/movie/' + str(movie_id) + '/similar_movies?api_key=' + str(API_KEY)).get("results")
    return render_template("similar.html", title="Similar To " + str(movie_id), results=results)

@app.route("/mine")
def mine():
    """render the favourites page"""
    return render_template("mine.html", title="My Favourites")

## Static file serving (for now)
@app.route("/assets/<path:path>")
def send_assets(path):
    """expose assets path"""
    return send_from_directory('public_assets', path)

if __name__ == "__main__":
    app.run(debug=True)
