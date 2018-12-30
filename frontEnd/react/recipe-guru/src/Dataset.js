import $ from 'jquery';
import * as qs from 'query-string';

class Dataset {
    static getIngredients(callback) {
        const ingredientsAPI = "https://recipe-guru.appspot.com/api/v1/ingredients";

        $.getJSON(ingredientsAPI, (data) => callback(data));
    }

    static getRecipe(id, callback) {
        const recipeAPI = "https://recipe-guru.appspot.com/api/v1/recipe"

        $.getJSON(recipeAPI + "/" + id, (data) => callback(data))
    }

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