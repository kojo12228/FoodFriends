import React, { Component } from 'react';
import Router from 'react-router-component'
import * as qs from 'query-string';

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
      includedIngredients: [],
      excludedIngredients: [],
      input: "",
      selected: false,
      exclude: false
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
    const matchingIng = e.target.value === "" ? [] : this.state.ingredients.filter((ingredient) => {
      return ingredient.match(inputRegex)
    })
    this.setState({
      input: e.target.value,
      matchedIngredients: matchingIng
    });
  }

  suggestionSelected(suggestion) {
    if (!this.state.exclude) {
      this.setState({
        includedIngredients: this.state.includedIngredients.concat([suggestion])
      })
    } else {
      this.setState({
        excludedIngredients: this.state.excludedIngredients.concat([suggestion])
      })
    }
    this.setState({
      input: "",
      matchedIngredients: []
    }, () => console.log(this.state.includedIngredients))
  }

  removeIngredient(ingredient, listType) {

    if (listType === "inclusion") {
      let list = this.state.includedIngredients;
      list = list.filter(ing => ing !== ingredient)
      this.setState({includedIngredients: list})
    } else {
      let list = this.state.excludedIngredients;
      list = list.filter(ing => ing !== ingredient)
      this.setState({excludedIngredients: list})
    }
  }

  toggleFocus() {
    this.setState({selected: !this.state.selected})
  }

  toggleInclusion() {
    this.setState({exclude: !this.state.exclude});
  }

  goGuru() {
    const queryParams = {
      ing: this.state.includedIngredients,
      ingexc: this.state.excludedIngredients
    }
    const queryString = qs.stringify(queryParams, {arrayFormat: "bracket"});
    window.location.href = "/results?" + queryString;
  }
 
  

  render() {
    let incIngr = this.state.includedIngredients.map(ing => {
      return <ListCard ing={ing} type="inclusion" remove={() => this.removeIngredient(ing, "inclusion") }/>
    })
    let excIngr = this.state.excludedIngredients.map(ing => {
      return <ListCard ing={ing} type="exclusion" remove={() => this.removeIngredient(ing, "exclusion") }/>
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
        <div style={{width: "100%"}}>
          <img src={ require('./logo.png') } alt="logo" height="200" width="200" style={{display: "block", margin: "auto" }}/>
        </div>
        <h1 id="arTitle">Recipe Guru</h1>
        {/*Search for ingredients search box + Add Ingredient button*/}
        <div id="ingredientSearch" className="card">
          <div>
            <input id="searchField" type="text" placeholder="Search for ingredients..." size={20} 
                  onChange={this.textChanged.bind(this)}
                  onFocus={() => this.toggleFocus()}
                  onBlur={() => this.toggleFocus()}
                  value={this.state.input}/>
            <hr></hr>
            <button id="inclusionToggle"
                    onClick={() => this.toggleInclusion()}
                    style={{color: this.state.exclude ? "red" : "black"}}>
              {this.state.exclude ? "exclude mode" : "include mode"}</button>
          </div>
          <div id="suggestedIng">
            {suggestedIngredients}
          </div>
        </div>
          {this.state.includedIngredients.length === 0 ? <div></div> :
            <div style={{textAlign: "center"}}>
              <h2 className="listLabel">Included Ingredients</h2>
              <div style={{width:"60%", overflowX:"hidden", marginLeft: "auto", marginRight: "auto"}}>{incIngr}</div>
            </div>
          }
          {this.state.excludedIngredients.length === 0 ? <div></div> :
            <div style={{textAlign: "center"}}>
              <h2 className="listLabel">Excluded Ingredients</h2>
              <div style={{width:"60%", overflowX:"hidden", marginLeft: "auto", marginRight: "auto"}}>
                {excIngr}
              </div>
            </div>
          }
        
        <div id="goGuru">
          <button type="button" id="submit" className="card"
                  onClick={() => this.goGuru()}>GO GURU!</button>
        </div>
      </div>
    );
  }
}

function ListCard(props) {
  const style = props.type === "inclusion" ? "inclusionCard listcard" : "exclusionCard listcard";
  const buttonStyle = props.type === "inclusion" ? " cardButton inclusionCardButton" : " cardButton exclusionCardButton"

  return (
    <div key={props.ing} className={style}>
        <p>{props.ing}</p>
        <button className={buttonStyle} onClick={props.remove}>Remove</button>
    </div>
  )
}

export default App;
