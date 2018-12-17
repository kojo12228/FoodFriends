import React, { Component } from 'react';

export class Recipe extends Component {
    constructor(props) {
        super(props)
        let recipe = {
            calories: 2,
            categories: [
                "Salad",
                "Dairy",
                "No-Cook",
                "Yogurt",
                "Mint",
                "Cucumber",
                "Summer",
                "Bon Appétit",
                "Kansas"
            ],
            directions: [
                "Place cucumbers in colander. Sprinkle with salt. Let stand 15 minutes. Rinse cucumbers. Drain on paper towels. Combine mint, garlic, and oregano in large bowl. Stir in yogurt and cream. Add cucumber and stir to coat. Season with pepper. Refrigerate until chilled. (Can be prepared 5 hours ahead.)"
            ],
            fat: 3,
            id: 4856496185671680,
            ingredients: [
                "3 medium cucumbers, peeled, seeded, diced",
                "1 1/2 teaspoons salt",
                "1 tablespoon fresh mint, minced",
                "1 garlic clove, minced",
                "1 teaspoon dried oregano",
                "1 8-ounce container plain yogurt",
                "2 tablespoons whipping cream",
                "Pepper"
            ],
            rating: 3.75,
            sodium: 603,
            title: "Cucumber-Yogurt Salad with Mint "
        }
        this.state = recipe
    }

    render() {
        const directionItems = this.state.directions.map(
            (direction, index) => <li key={index}>{direction}</li>
        );
        const ingredientItems = this.state.ingredients.map(
            (ingredient, index) => <li key={index}>{ingredient}</li>
        );
        return(
            <div>
                <div>
                    <img src={ require('./logo.png') } alt="logo" />
                    <h1>{this.state.title}</h1>
                    <Rating rating={this.state.rating}/>
                </div>
                <h2>Ingredients</h2>
                <ul>{ingredientItems}</ul>
                <h2>Directions</h2>
                <ol>{directionItems}</ol>
                <h2>Stats</h2>
                <div>
                    <p>Calories</p>
                    <p>{this.state.calories}</p>
                </div>
                <div>
                    <p>Fat</p>
                    <p>{this.state.fat}</p>
                </div>
                <div>
                    <p>Sodium</p>
                    <p>{this.state.sodium}</p>
                </div>
            </div>
        )
    }
}

function Rating(props) {
    return <p>Rating: {props.rating}</p>
}

export default Recipe;