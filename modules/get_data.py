"""module used by SimilarFilms to retrieve data"""
import requests

def get_data(path=""):
    """does the data fetch for the movie database json endpoint"""
    host = "api.themoviedb.org"
    response = requests.get("https://" + host + path).json
    return response()
