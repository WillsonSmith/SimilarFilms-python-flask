"""module used by SimilarFilms to retrieve data"""
import requests

def chunks(array, number):
    return [array[i:i+number] for i in range(0, len(array), number)]

def getResults(response):
    return response.get('results')

def chunkResults(results):
    return chunks(chunks(results, 2), 2)

def get_data(path=""):
    """does the data fetch for the movie database json endpoint"""
    host = "api.themoviedb.org"
    response = requests.get("https://" + host + path).json
    return chunkResults(getResults(response()))
