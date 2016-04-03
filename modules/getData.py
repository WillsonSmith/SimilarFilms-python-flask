import requests

def getData(title="", path=""):
    host = "api.themoviedb.org"
    r = requests.get("https://" + host + path).json
    return r()
