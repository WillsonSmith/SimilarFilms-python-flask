import requests

def get_data(title="", path=""):
    host = "api.themoviedb.org"
    r = requests.get("https://" + host + path).json
    return r()
