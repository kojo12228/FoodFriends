import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

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
        <div id="ingredientSearch">
          {/*Search box*/}
          <input id="search" type="text" placeholder="Search for ingredients..." />
          {/*button*/}
          <input type="submit" id="addIngr" defaultValue="+" />  
        </div>
        {/*Ingredients List/results*/}
        <section id="ingredientsResults">
          <h2 id="ingredientsLabel">Selected Ingredients</h2> 
          <ul id="returnedIngredients">
            <li><a href="#">Milk</a></li>
            <li><a href="#">Flour</a></li>
            <li><a href="#">Salt</a></li>
            <li><a href="#">Pepper</a></li>
            <li><a href="#">Milk</a></li>
            <li><a href="#">Flour</a></li>
            <li><a href="#">Salt</a></li>
            <li><a href="#">Pepper</a></li>
            <li><a href="#">Beans</a></li>
            <li><a href="#">Asparagus</a></li>
            <li><a href="#">Paprika</a></li>
            <li><a href="#">Beans</a></li>
            <li><a href="#">Asparagus</a></li>
            <li><a href="#">Paprika</a></li>
          </ul>
        </section>
        <div id="goGuru">
          <input id="submit" defaultValue="GO Guru!"/>
          <br />
          <div id="list8">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <br />
          <br />
          <a>
            <img src="logo.png" id="rgLogo" alt="Recipe Guru" />
          </a>
        </div>  
      </div>
    );
  }
}

export default App;
