import $ from 'jquery';
import * as qs from 'query-string';

/**
 * Callback type used throughout the class
 * 
 * @callback asyncCallback
 * @param {Object} data Data to be returned
 */

class Dataset {
  /**
   * Get all ingredients from the dataset
   * @param {asyncCallback} callback 
   */
  static getIngredients(callback) {
    const ingredientsAPI = "https://recipe-guru.appspot.com/api/v1/ingredients";

    $.getJSON(ingredientsAPI, (data) => callback(data));
  }

  /**
   * Get a recipe by the recipe ID used in the database
   * @param {number} id ID of recipe
   * @param {asyncCallback} callback 
   */
  static getRecipe(id, callback) {
    const recipeAPI = "https://recipe-guru.appspot.com/api/v1/recipe"

    $.getJSON(recipeAPI + "/" + id, (data) => callback(data))
  }

  /**
   * Get all recipes that satisfy the inclusion/exclusion ingredients
   * and other constraints.
   * @param {string[]} incIngredients Ingredients to include
   * @param {string[]} excIngredients Ingredients to exclude
   * @param {string} diet Dietary requirements: Vgn, Vgt, Pesc or `null`
   * @param {string[]} allergies Allergy exclusions, can include:
   * Dairy, Gluten, Fish, Nuts and Shellfish
   * @param {string} matchType Atmost and Atleast inclusion ability
   * @param {asyncCallback} callback 
   */
  static queryRecipes(incIngredients, excIngredients, diet, allergies, matchType, callback) {
    const queryObject = {
      ing: incIngredients
    }
    if (excIngredients.length > 0) queryObject.ingexc = excIngredients;
    if (diet != null) queryObject.diet = diet;
    if (allergies.length > 0) queryObject.allergy = allergies;

    if (matchType === "Atleast" || matchType === "Atmost")
      queryObject.match = matchType
    
    this.queryRecipesWithObject(queryObject, callback)
  }

  static queryRecipesWithObject(queryObject, callback) {
    const recipesAPI = "https://recipe-guru.appspot.com/api/v1/recipes"

    let queryString = qs.stringify(queryObject, {arrayFormat: "bracket"})
    $.getJSON(recipesAPI + "?" + queryString, (data) => callback(data))
  }
}

export default Dataset;