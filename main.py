import os
from flask import Flask, render_template, request, json, jsonify
from google.appengine.ext import ndb

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
    # See http://flask.pocoo.org/docs/1.0/patterns/jquery/ for using jQuery and Flask
    return jsonify(result=ingredientList)

# @app.route('/testjsonhtml')
# def testjsonhtml():
#     return render_template('testjson.html')

# @app.route('/testjson')
# def testjson():
#     jsonfilepath = os.path.join(app.root_path, 'data', "combined_r_i.json")
#     recipes = json.load(open(jsonfilepath))
#     recipeModels = [ Recipe(
#             directions = recipe["directions"],
#             fat = recipe["fat"],
#             categories = recipe["categories"],
#             calories = recipe["calories"],
#             protein = recipe["protein"],
#             rating = recipe["rating"],
#             title = recipe["title"],
#             ingredients = recipe["ingredients"],
#             ingredientNames = recipe["ingredientNames"],
#             sodium = recipe["sodium"]
#         ) for id, recipe in recipes.iteritems() ]
#     for rm in recipeModels:
#         rm.put()

class Recipe(ndb.Model):
    directions = ndb.StringProperty(repeated=True)
    fat = ndb.IntegerProperty()
    categories = ndb.StringProperty(repeated=True)
    calories = ndb.IntegerProperty()
    protein = ndb.IntegerProperty()
    rating= ndb.FloatProperty()
    title = ndb.StringProperty()
    ingredients = ndb.StringProperty(repeated=True)
    ingredientNames = ndb.StringProperty(repeated=True)
    sodium = ndb.IntegerProperty()

def modelToDictionary(recipe):
    return {
        "directions": recipe.directions,
        "fat": recipe.fat,
        "categories": recipe.categories,
        "calories": recipe.protein,
        "rating": recipe.rating,
        "title": recipe.title,
        "ingredients": recipe.ingredients,
        "sodium": recipe.sodium
    }

@app.route("/recipes")
def recipeNoFilter():
    ingredients = request.args.getlist("ing[]")
    recipes = Recipe.query()
    matchingRecipes = [ modelToDictionary(recipe) for recipe in recipes.iter() if set(ingredients) <= set(recipe.ingredientNames) ]
    return jsonify(matchingRecipes)