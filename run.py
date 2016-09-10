"""
This is the main app for running SimilarFilms. It contains all of the routes for
the application. It is dependent on flask, os, and the locally defined get_data.
"""
import os

from flask import Flask, render_template, send_from_directory, request, redirect, url_for
from modules.get_data import get_data

app = Flask(__name__)

API_KEY = os.environ['APIKEY']

@app.route('/')
def index():
    """render the index of SimilarFilms"""
    results = get_data(path='/3/movie/popular?api_key=' + str(API_KEY)).get('results')[:18]
    return render_template('index.html', page='home', title='Popular Films', results=results)

@app.route('/similar/<int:movie_id>/<path:movie_name>')
def similar(movie_id, movie_name):
    """render /similar/#"""
    results = get_data(path='/3/movie/' + str(movie_id) + '/similar_movies?api_key=' + str(API_KEY)).get('results')[:18]
    return render_template('similar.html', title='Similar To ' + movie_name, results=results)

@app.route('/search', methods=['POST'])
def search_data():
    path = request.form['search']
    return redirect(url_for('search', movie_name=path))

@app.route('/search/<string:movie_name>', methods=['GET'])
def search(movie_name):
    """render /search/#"""
    results = get_data(path='/3/search/movie?query=' + str(movie_name) + '&api_key=' + str(API_KEY)).get('results')[:18]
    return render_template('search.html', title='Similar To ' + str(movie_name), results=results)

@app.route('/mine')
def mine():
    """render the favourites page"""
    return render_template('mine.html', page='mine', title='My Favourites')

## Static file serving (for now)
@app.route('/assets/<path:path>')
def send_assets(path):
    """expose assets path"""
    return send_from_directory('public_assets', path)

if __name__ == '__main__':
    try:
        debug = os.environ['DEBUG']
        app.run(debug=True, host='0.0.0.0')
    except:
        app.run()
