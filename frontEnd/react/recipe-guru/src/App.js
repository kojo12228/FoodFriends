import React, { Component } from 'react';
import Router from 'react-router-component';
import Toggle from 'react-toggle';
import "react-toggle/style.css"
import * as qs from 'query-string';

import './style.css';
import Logo from './Logo'
import Recipe from './Recipe.js'
import Results from './Results.js'
import Dataset from './Dataset'
import ErrorPage from './404Error'

var Locations = Router.Locations;
var Location = Router.Location;

class App extends Component {
  render() {
    return (
      <Locations>
        <Location path='/' handler={SearchHome} />
        <Location path='/recipe/:id' handler={Recipe} />
        <Location path='/results' handler={Results} />
        <Location path='*' handler={ErrorPage}/>
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
      this.setState({ingredients: data})
    })
  }

  textChanged(e) {
    const inputRegex = new RegExp(e.target.value, "i") //regex of search text
    //Show no results for no search text, otherwise all that match inputRegex
    const matchingIng = e.target.value === "" ? [] : this.state.ingredients.filter((ingredient) => {
      return ingredient.match(inputRegex)
    })
    this.setState({
      input: e.target.value,
      matchedIngredients: matchingIng
    });
  }

  suggestionSelected(suggestion) {
    /* While in exclusion mode, add selected ingredients to the exclusion list,
     * otherwise add them to the inclusion list
     */
    if (!this.state.exclude) {
      this.setState({
        includedIngredients: this.state.includedIngredients.concat([suggestion])
      })
    } else {
      this.setState({
        excludedIngredients: this.state.excludedIngredients.concat([suggestion])
      })
    }
    //Upon selection, reset input to empty string
    this.setState({
      input: "",
      matchedIngredients: []
    })
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
    let incIngredients = this.state.includedIngredients.map(ing => {
      return <ListCard key={ing} ing={ing} type="inclusion" remove={() => this.removeIngredient(ing, "inclusion") }/>
    })
    let excIngredients = this.state.excludedIngredients.map(ing => {
      return <ListCard key={ing} ing={ing} type="exclusion" remove={() => this.removeIngredient(ing, "exclusion") }/>
    })
    let suggestedIngredients = this.state.matchedIngredients.map(ing => {
      return (
          <li key={ing}
              className="suggestedItem"
              onClick={() => this.suggestionSelected(ing)}>{ing}</li>)
    })

    return (
      <div>
        <link rel="stylesheet" href="style.css" />
        <title>Recipe Guru</title>
        <Logo height="200" width="200"/>
        <h1 id="arTitle">Recipe Guru</h1>
        <div id="ingredientSearch" className="card">
          <div>
            {/* Search box input field */}
            <input id="searchField" type="text" placeholder="Search for ingredients..." size={20} 
                  onChange={this.textChanged.bind(this)}
                  onFocus={() => this.toggleFocus()}
                  onBlur={() => this.toggleFocus()}
                  value={this.state.input}/>
            <hr></hr>
            {/* Toggle for include/exclude mode */}
            <label>
              <Toggle 
                defaultChecked={!this.state.exclude}
                onChange={() => this.toggleInclusion()}
                icons={false}/>
              <span id="inclusionToggle">{this.state.exclude ? "exclude mode" : "include mode"}</span>
            </label>
          </div>
          {this.state.matchedIngredients.length > 0
           ? <hr></hr> : <div></div>}
          <ul id="suggestedIng">
            {suggestedIngredients}
          </ul>
        </div>
          {this.state.includedIngredients.length === 0 ? <div></div> :
            // Included ingredients cards
            <div style={{textAlign: "center"}}>
              <h2 className="listLabel">Included Ingredients</h2>
              <div className="listdiv">{incIngredients}</div>
            </div>
          }
          {this.state.excludedIngredients.length === 0 ? <div></div> :
            // Excluded ingredients cards
            <div style={{textAlign: "center"}}>
              <h2 className="listLabel">Excluded Ingredients</h2>
              <div className="listdiv">
                {excIngredients}
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

/**
 * Inclusion or exclusion list card.
 */
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
