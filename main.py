import os
from flask import Flask, render_template, request, json, jsonify

app = Flask(__name__)

@app.route('/')
def form():
    return render_template('index.html')

@app.route('/ingredients')
def getIngredients():
    # Based on code from https://stackoverflow.com/a/50935393
    jsonfilepath = os.path.join(app.root_path, 'data', "ingrlist.json")
    # From https://stackoverflow.com/a/21230727
    ingredientList = json.load(open(jsonfilepath))
    return jsonify(result=ingredientList)
    # See http://flask.pocoo.org/docs/1.0/patterns/jquery/ for using jQuery and Flask