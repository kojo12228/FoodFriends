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

def modelToDictionary(recipe, ingredientsMatched, ingredientsNotMatched):
    return {
        "id": recipe.key.integer_id(),
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
    
    '''
    Atleast: match recipes if they contain at least all the ingredients
    provided
    Atmost: match recipes if they contain at most all the ingredients
    provided
    '''
    match = request.args.get("match")

    '''
    minMatch: the minimum subset size of ingredients provided that can 
    match with a recipe.
    - If 1 or less will match with any subset of ingredients provided
    (apart room empty set)
    - If more than the number of ingredients provided, there will be no recipes
    '''
    minMatch = request.args.get("minMatch")
    if (minMatch == None):
        minMatch = 0
    else:
        minMatch = int(minMatch)

    # recipes = Recipe.query()
    # notExcRecipeModels = [ recipe for recipe in recipes.iter() if len(set(recipe.ingredientNames) & set(ingredientsEx)) == 0 ]
    # matchingRecipes = None
    # if (match == "Atleast" or match == None):
    #     matchingRecipes = atleast(notExcRecipeModels, ingredients, minMatch)
    # else:
    #     matchingRecipes = atmost(notExcRecipeModels, ingredients, minMatch)
    # return jsonify(matchingRecipes)
    return jsonify(ingredientsEx)

@app.route("/api/v1/recipe/<id>")
def getRecipeByID(id):
    recipeModel = Recipe.get_by_id(int(id))
    recipe = {
        "id": int(id),
        "directions": recipeModel.directions,
        "fat": recipeModel.fat,
        "categories": recipeModel.categories,
        "calories": recipeModel.protein,
        "rating": recipeModel.rating,
        "title": recipeModel.title,
        "ingredients": recipeModel.ingredients,
        "sodium": recipeModel.sodium,
    }
    return jsonify(recipe)

def matchRecipes(matchQueryValue, ingredients, recipeIngredientNames):
    if (matchQueryValue == "Atleast" or matchQueryValue == None):
        return set(ingredients) <= set(recipeIngredientNames)
    elif (matchQueryValue == "Atmost"):
        return set(ingredients) >= set(recipeIngredientNames)

@app.route("/api/test/recipes")
def recipeNoFilter():
    try:
        return "Testing not in use"
    except Exception:
        trace = traceback.format_exc()
        return str(trace)

def powerset(ingredientsToMatch):
    '''Returns all possible subsets of list of ingredients provided, \
    in a tuple with every element in the ingredients list provided \
    not in the subset

    \npowerset([1,2]) = [([1, 2], []), ([1], [2]), ([2], [1])]
    '''
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
    '''Returns recipes that have atleast a subset of ingredientsInc, \
    the ingredients to match with, which is at least the size of minMatchNo

    recipeModels
        list of recipes in Recipe model format
    ingredientsInc
        list of ingredients to match recipes with
    minMatchNo
        minimum subset of ingredientsInc to match with, should be between
        1 and number of ingredients provided
    '''
    powersetIngredients = powerset(ingredientsInc)
    matchingRecipeModels = []
    for ingMatch, notIngMatch in powersetIngredients:
        if len(ingMatch) >= minMatchNo:
            for recipe in recipeModels:
                if set(ingMatch) <= set(recipe.ingredientNames) and len(set(notIngMatch) & set(recipe.ingredientNames)) == 0:
                    matchingRecipeModels.append((recipe, ingMatch, notIngMatch))

    matchingRecipes = []
    for recipe, ingMatch, notIngMatch in matchingRecipeModels:
        matchingRecipes.append(modelToDictionary(recipe, ingMatch, notIngMatch))
    
    return matchingRecipes

def atmost(recipeModels, ingredientsInc, minMatchNo):
    '''Returns recipes for which the ingredients are ingredientsInc, \
    the ingredients to match with, or a subset larger than minMatchNo 

    recipeModels
        list of recipes in Recipe model format
    ingredientsInc
        list of ingredients to match recipes with
    minMatchNo
        minimum subset of ingredientsInc to match with, should be between
        1 and number of ingredients provided
    '''
    powersetIngredients = powerset(ingredientsInc)
    matchingRecipeModels = []
    for ingMatch, notIngMatch in powersetIngredients:
        if len(ingMatch) >= minMatchNo:
            for recipe in recipeModels:
                if ingMatch == recipe.ingredientNames:
                    matchingRecipeModels.append((recipe, ingMatch, notIngMatch))
    matchingRecipes = []
    for recipe, ingMatch, notIngMatch in matchingRecipeModels:
        matchingRecipes.append(modelToDictionary(recipe, ingMatch, notIngMatch))
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