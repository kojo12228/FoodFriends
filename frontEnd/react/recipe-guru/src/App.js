import React, { Component } from 'react';
import Router from 'react-router-component'

import './style.css';
import Recipe from './Recipe.js'
import Results from './Results.js'
import Dataset from './Dataset'

var Locations = Router.Locations;
var Location = Router.Location;

class App extends Component {
  render() {
    return (
      <Locations>
        <Location path='/' handler={SearchHome} />
        <Location path='/recipe/:id' handler={Recipe} />
        <Location path='/results' handler={Results} />
      </Locations>
    )
  }
}

class SearchHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      matchedIngredients: [],
      selectedIngredients: [],
      input: "",
      selected: false
    };
  }

  componentDidMount() {
    Dataset.getIngredients((data) => {
      //const items = data.map((val, i) => {return {id: i, value: val}})
      this.setState({ingredients: data})
    })
  }

  textChanged(e) {
    const inputRegex = new RegExp(e.target.value, "i")
    const matchingIng = this.state.ingredients.filter((ingredient) => {
      return ingredient.match(inputRegex)
    })
    this.setState({
      input: e.target.value,
      matchedIngredients: matchingIng
    });
  }

  suggestionSelected(suggestion) {
    this.setState({
      selectedIngredients: this.state.selectedIngredients.concat([suggestion]),
      input: "",
      matchedIngredients: []
    })
  }

  toggleFocus() {
    this.setState({selected: !this.state.selected})
  }
 
  

  render() {
    let selectedIngredients = this.state.selectedIngredients.map(ing => {
      return (
        <div key={ing} className="selectedIng">
          <button className="removeIng">{"\u274C"}</button>
          <p>{ing}</p>
        </div>
      )
    })
    let suggestedIngredients = this.state.matchedIngredients.map(ing => {
      return (
          <div key={ing}
              className="suggestedItem"
              onClick={() => this.suggestionSelected(ing)}>{ing}</div>)
    })

    return (
      <div>
        <link rel="stylesheet" href="style.css" />
        <title>Recipe Guru</title>
        <link rel="shortcut icon" href="img/nameofyouriconfile.ico" />
        {/*links this to a javascript file*/}
        
        {/*h1 id="mainTitle">Recipe Guru</h1*/}
        <a>
          {/*img src="title2.png" alt="Recipe Guru"*/}
        </a>
        <h1 id="arTitle">Recipe Guru</h1>
        {/*Search for ingredients search box + Add Ingredient button*/}
        <div className="ingredientSearch">
          {/*Search box*/}
          <input id="search" type="text" placeholder="Search for ingredients..." size={20} 
                  onChange={this.textChanged.bind(this)}
                  onFocus={() => this.toggleFocus()}
                  onBlur={() => this.toggleFocus()}
                  value={this.state.input}/>
          {/*button*/}
          <button type="button" id="addIngr">+</button>
        </div>
        {/*Ingredients List/results*/}
        {/*<div className="ingredientsResults">
          <h2 id="ingredientsLabel">Selected Ingredients</h2> 
          {/*       <div class="left area" >
        <span id= "ingr_elem">
          Selected Ingredients:
        </span> }

        </div>
        <ol id="returnedIngredients">
          <li><a href="#">Milk</a></li>
          <li><a href="#">Asparagus</a></li>
          <li><a href="#">Paprika</a></li>
        </ol>*/}
        <div style={{overflowY: "scroll", maxHeight: "250px", width: "50%", margin: "auto"}}>{suggestedIngredients}</div>
        <div style={{width: "50%", margin: "auto"}}>{selectedIngredients}</div>
        <div id="goGuru">
          <button type="button" id="submit">GO GURU!</button>
        </div>
        <div id="rgLogo">
        <img src={ require('./logo.png') } />
        </div>
      </div>
    );
  }
}

export default App;
