import os
import traceback

from flask import Flask, render_template, request, json, jsonify
from google.appengine.ext import ndb
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def form():
    return render_template('index.html')

@app.route('/api/v1/ingredients')
def getIngredients():
    # Based on code from https://stackoverflow.com/a/50935393
    jsonfilepath = os.path.join(app.root_path, 'data', "ingrlist.json")
    # From https://stackoverflow.com/a/21230727
    ingredientList = json.load(open(jsonfilepath))
    # See http://flask.pocoo.org/docs/1.0/patterns/jquery/ for using jQuery and Flask
    return jsonify(ingredientList)

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

@app.route("/api/v1/recipes")
def getRecipe():
    ingredients = request.args.getlist("ing[]")
    ingredientsEx = request.args.getlist("ingexc[]")

    allergies = request.args.getlist("allergy[]")
    diet = request.args.get("diet")
    if (len(allergies) > 0):
        jsonfilepath = os.path.join(app.root_path, 'data', "allergy.json")
        allergyJSON = json.load(open(jsonfilepath))
        for allergy in allergies:
            ingredientsEx = ingredientsEx + allergyJSON[allergy]
    if (not diet == None):
        jsonfilepath = os.path.join(app.root_path, 'data', "dietary.json")
        dietaryJSON = json.load(open(jsonfilepath))
        if (diet[0] == "Vgn"):
            ingredientsEx = ingredientsEx + dietaryJSON['Vegan'] + dietaryJSON['Meat'] + dietaryJSON['Fish'] + dietaryJSON['Egg'] + dietaryJSON['Dairy']
        elif (diet[0] == "Vgt"):
            ingredientsEx = ingredientsEx + dietaryJSON['Vegetarian'] + dietaryJSON['Meat'] + dietaryJSON['Fish']
        elif (diet[0] == "Pesc"):
            ingredientsEx = ingredientsEx + dietaryJSON['Pescatarian'] + dietaryJSON['Meat']
    
    match = request.args.get("match")

    recipes = Recipe.query()
    includeRecipes = [ recipe for recipe in recipes.iter() if matchRecipes(match, ingredients, recipe.ingredientNames) ] # <= is subset/equal to
    matchingRecipes = [ modelToDictionary(recipe) for recipe in includeRecipes if len(set(recipe.ingredientNames) & set(ingredientsEx)) == 0 ] # & is intersection
    return jsonify(matchingRecipes)

def matchRecipes(matchQueryValue, ingredients, recipeIngredientNames):
    if (matchQueryValue == "Atleast" or matchQueryValue == None):
        return set(ingredients) <= set(recipeIngredientNames)
    elif (matchQueryValue == "Atmost"):
        return set(ingredients) >= set(recipeIngredientNames)

@app.route("/api/test/recipes")
def recipeNoFilter():
    try:
        ingredients = request.args.getlist("ing[]")
        ingredientsEx = request.args.getlist("ingexc[]")

        allergies = request.args.getlist("allergy[]")
        diet = request.args.get("diet")
        if (len(allergies) > 0):
            jsonfilepath = os.path.join(app.root_path, 'data', "allergy.json")
            allergyJSON = json.load(open(jsonfilepath))
            for allergy in allergies:
                ingredientsEx = ingredientsEx + allergyJSON[allergy]
        if (not diet == None):
            jsonfilepath = os.path.join(app.root_path, 'data', "dietary.json")
            dietaryJSON = json.load(open(jsonfilepath))
            if (diet[0] == "Vgn"):
                ingredientsEx = ingredientsEx + dietaryJSON['Vegan'] + dietaryJSON['Meat'] + dietaryJSON['Fish'] + dietaryJSON['Egg'] + dietaryJSON['Dairy']
            elif (diet[0] == "Vgt"):
                ingredientsEx = ingredientsEx + dietaryJSON['Vegetarian'] + dietaryJSON['Meat'] + dietaryJSON['Fish']
            elif (diet[0] == "Pesc"):
                ingredientsEx = ingredientsEx + dietaryJSON['Pescatarian'] + dietaryJSON['Meat']
        
        match = request.args.get("match")
        minMatch = request.args.get("minMatch")
        if (minMatch == None):
            minMatch = 0
        else:
            minMatch = int(minMatch)

        recipes = Recipe.query()
        notExcRecipeModels = [ recipe for recipe in recipes.iter() if len(set(recipe.ingredientNames) & set(ingredientsEx)) == 0 ]
        matchingRecipes = None
        if (match == "Atleast" or match == None):
            matchingRecipes = atleast(notExcRecipeModels, ingredients, minMatch)
        else:
            matchingRecipes = atmost(notExcRecipeModels, ingredients, minMatch)
        return jsonify(matchingRecipes)
    except Exception as e:
        trace = traceback.format_exc()
        return str(trace)

def modelToDictionaryV2(recipe, ingredientsMatched, ingredientsNotMatched):
    return {
        "directions": recipe.directions,
        "fat": recipe.fat,
        "categories": recipe.categories,
        "calories": recipe.protein,
        "rating": recipe.rating,
        "title": recipe.title,
        "ingredients": recipe.ingredients,
        "sodium": recipe.sodium,
        "matched": ingredientsMatched,
        "unmatched": ingredientsNotMatched,
        "percentage": (len(ingredientsMatched) * 100) // (len(ingredientsMatched) + len(ingredientsNotMatched)) 
    }

def powerset(ingredientsToMatch):
    ingLists = []
    for i in range(len(ingredientsToMatch)):
        for j in reversed(range(i+1, len(ingredientsToMatch)+1)):
            ingLists = ingLists + [ingredientsToMatch[i:j]]
    ingLists.sort(key= lambda x : -len(x))
    tuples = []
    setIng = set(ingredientsToMatch)
    for i in ingLists:
        tuples = tuples + [(i, list(setIng - set(i)))]
    return tuples

def atleast(recipeModels, ingredientsInc, minMatchNo):
    powersetIngredients = powerset(ingredientsInc)
    matchingRecipeModels = []
    for ingMatch, notIngMatch in powersetIngredients:
        if len(ingMatch) >= minMatchNo:
            for recipe in recipeModels:
                if set(ingMatch) <= set(recipe.ingredientNames) and len(set(notIngMatch) & set(recipe.ingredientNames)) == 0:
                    matchingRecipeModels.append((recipe, ingMatch, notIngMatch))

    matchingRecipes = []
    for recipe, ingMatch, notIngMatch in matchingRecipeModels:
        matchingRecipes.append(modelToDictionaryV2(recipe, ingMatch, notIngMatch))
    
    return matchingRecipes

def atmost(recipeModels, ingredientsInc, minMatchNo):
    powersetIngredients = powerset(ingredientsInc)
    matchingRecipeModels = []
    for ingMatch, notIngMatch in powersetIngredients:
        if len(ingMatch) >= minMatchNo:
            for recipe in recipeModels:
                if ingMatch == recipe.ingredientNames:
                    matchingRecipeModels.append((recipe, ingMatch, notIngMatch))
    matchingRecipes = []
    for recipe, ingMatch, notIngMatch in matchingRecipeModels:
        matchingRecipes.append(modelToDictionaryV2(recipe, ingMatch, notIngMatch))
    return matchingRecipes


# For React Routing
# Snippet derived from http://flask.pocoo.org/snippets/57/
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
#