import os

from flask import Flask, render_template, send_from_directory
from modules.get_data import get_data

app = Flask(__name__)

API_KEY = os.environ['APIKEY']

@app.route("/")
def index():
    results = get_data(path = "/3/movie/popular?api_key=" + str(API_KEY)).get("results")
    return render_template("index.html", title = "Popular Films", results = results)

@app.route("/similar/<int:movie_id>")
def similar(movie_id):
    results = get_data(path = '/3/movie/' + str(movie_id) + '/similar_movies?api_key=' + str(API_KEY)).get("results")
    return render_template("similar.html", title = "Similar To " + str(movie_id), results = results)

@app.route("/mine")
def mine():
    return render_template("mine.html", title = "My Favourites")

## Static file serving (for now)
@app.route("/css/<path:path>")
def send_css(path):
    return send_from_directory('css', path)

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory('js', path)

if __name__ == "__main__":
    app.run(debug=True)
