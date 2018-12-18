import React, { Component } from 'react';
import $ from 'jquery';
import './Recipe.css'

export class Recipe extends Component {
    constructor(props) {
        super(props)
        let recipe = {
            calories: 0,
            categories: [],
            directions: [],
            fat: 0,
            id: 0,
            ingredients: [],
            rating: 0,
            sodium: 0,
            title: ""
        }
        this.state = recipe
    }

    componentDidMount() {
        $.getJSON("https://recipe-guru.appspot.com/api/v1/recipe/" + this.props.id, (data) => {
            this.setState(data)
        })
    }

    render() {
        const directionItems = this.state.directions.map(
            (direction, index) => <li className="directionItem" key={index}>{direction}</li>
        );
        const ingredientItems = this.state.ingredients.map(
            (ingredient, index) => <li className="ingredientItem" key={index}>{ingredient}</li>
        );
        return(
            <div>
                <link rel="stylesheet" href="Recipe.css" />
                <div id="recipe">
                    <div id="recipeHeader">
                        <img src={ require('./logo.png') } alt="logo" id="headerLogo" height="100" width="100"/>
                        <h1 id="recipeName">{this.state.title}</h1>
                        <Rating rating={this.state.rating}/>
                    </div>
                    <div className="recipeList">
                        <h2 className="recipeSubHeading">Ingredients</h2>
                        <ul>{ingredientItems}</ul>
                    </div>
                    <div className="recipeList">
                        <h2 className="recipeSubHeading">Directions</h2>
                        <ol>{directionItems}</ol>
                    </div>
                    <div id="stats">
                        <h2 className="recipeSubHeading">Stats</h2>
                        <StatBox heading="Calories" value={this.state.calories} />
                        <StatBox heading="Fat" value={this.state.fat} />
                        <StatBox heading="Sodium" value={this.state.sodium} />
                    </div>
                </div>
            </div>
        )
    }
}

function Rating(props) {
    let rating = ""
    for (let index = 0; index < Math.round(props.rating); index++) {
        rating = rating + "\u25CF"
    }
    if (Math.round((props.rating % 1) * 2) === 1) {
        rating = rating + "\u25D6"
    } 
    return <p id="recipeRating">Rating: {rating}</p>
}

function StatBox(props) {
    return (
        <span className="statBox">
            <div className="statHeading"><h3>{props.heading}</h3></div>
            <div className="statValue"><p>{props.value}</p></div>
        </span>
    )
}

export default Recipe;