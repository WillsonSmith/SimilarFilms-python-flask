import os

from flask import Flask, render_template, send_from_directory
from modules.getData import getData

app = Flask(__name__)

@app.route("/")
def index():
    api_key = os.environ['APIKEY']
    results = getData(path = "/3/movie/popular?api_key=a1ec39c4f3e5b788fb1ce58c719ab9cc").get("results")
    return render_template("index.html", title = "Popular Films", results = getData(path = "/3/movie/popular?api_key=" + str(api_key)).get("results"))

@app.route("/css/<path:path>")
def send_css(path):
    return send_from_directory('css', path)

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory('js', path)

if __name__ == "__main__":
    app.run(debug=True)
