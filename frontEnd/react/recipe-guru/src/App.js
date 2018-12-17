import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Recipe from './Recipe.js'


class App extends Component {
  render() {
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
          <input id="search" type="text" placeholder="Search for ingredients..." size={20} />
          {/*button*/}
          <button type="button" id="addIngr">+</button>
        </div>
        {/*Ingredients List/results*/}
        <div className="ingredientsResults">
          <h2 id="ingredientsLabel">Selected Ingredients</h2> 
          {/*       <div class="left area" >
        <span id= "ingr_elem">
          Selected Ingredients:
        </span> */}
        </div>
        <ol id="returnedIngredients">
          <li><a href="#">Milk</a></li>
          <li><a href="#">Asparagus</a></li>
          <li><a href="#">Paprika</a></li>
        </ol>
        <div id="goGuru">
          <button type="button" id="submit">GO GURU!</button>
        </div>
        <div id="rgLogo">
        <img src={ require('./logo.png') } />
        </div>
        <Recipe />
      </div>
    );
  }
}

export default App;
