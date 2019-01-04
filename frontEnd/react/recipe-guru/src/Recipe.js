import React, { Component } from 'react';
import './Recipe.css';
import Dataset from './Dataset.js';

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
      protein: 0,
      rating: 0,
      sodium: 0,
      title: ""
    }
    this.state = recipe
  }

  componentDidMount() {
    //Get recipe on loading component
    Dataset.getRecipe(this.props.id, (data) => this.setState(data))
  }

  render() {
    const directionItems = this.state.directions.map(
      (direction, index) => <li className="recipeListItem" key={index}>{direction}</li>
    );
    const ingredientItems = this.state.ingredients.map(
      (ingredient, index) => <li className="recipeListItem" key={index}>{ingredient}</li>
    );

    return (
      <div>
        <div id="recipe">
          <div id="recipeHeader" className="card">
            <a href="/">
              <img src={ require('./logo.png') } alt="logo" id="headerLogo"
                   height="100" width="100"/>
            </a>
            <h1 id="recipeName">{this.state.title}</h1>
            <Rating rating={this.state.rating}/>
          </div>

          <div className="card recipeList">
            <h2 className="recipeSubHeading">Ingredients</h2>
            <hr></hr>
            <ul style={{paddingLeft: "0px"}}>{ingredientItems}</ul>
          </div>

          <div className="card recipeList">
            <h2 className="recipeSubHeading">Directions</h2>
            <hr></hr>
            <ol style={{paddingLeft: "0px"}}>{directionItems}</ol>
          </div>

          <div id="stats">
            <StatBox heading="Calories" value={this.state.calories} />
            <StatBox heading="Fat" value={this.state.fat} />
            <StatBox heading="Sodium" value={this.state.sodium} />
            <StatBox heading="Protein" value={this.state.protein} />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * JSX Element of recipe rating
 */
function Rating(props) {
  let rating = ""
  for (let index = 0; index < Math.round(props.rating); index++) {
    rating = rating + "\u2605"
  }
  return <p id="recipeRating">Rating: {rating}</p>
}

/**
 * JSX Element of recipe dietary information
 */
function StatBox(props) {
  return (
    <span className="card statBox">
      <div className="statHeading"><h3>{props.heading}</h3></div>
      <hr></hr>
      <div className="statValue"><p>{props.value}</p></div>
    </span>
  )
}

export default Recipe;