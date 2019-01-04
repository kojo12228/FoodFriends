import React, { Component } from 'react';
import Router from 'react-router-component';
import './Results.css';
import Dataset from './Dataset.js';
var Link = Router.Link;

export class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      diet: "None",
      caloriesMax: "",
      fatMax: "",
      sodiumMax: "",
      proteinMax: "",
      allergy: {
        Diary: false,
        Gluten: false,
        Fish: false,
        Nuts: false,
        Shellfish: false
      },
      percentage: "0",
      rating: "0"
    };
  }

  updateRecipes() {
    let allergies = Object.keys(this.state.allergy).filter(val => this.state.allergy[val] === true)

    Dataset.queryRecipes(
      this.props._query.ing ? this.props._query.ing : [],
      this.props._query.ingexc ? this.props._query.ingexc : [],
      this.state.diet === "None" ? null : this.state.diet,
      allergies,
      "Atleast",
      (data) => {
        data.sort((a,b) => b.percentage - a.percentage)
        const filtered = data.filter(recipe => {
          return (this.state.caloriesMax === "" || recipe.calories < +this.state.caloriesMax) &&
                  (this.state.fatMax === "" || recipe.fat < +this.state.fatMax) &&
                  (this.state.sodiumMax === "" || recipe.sodium < +this.state.sodiumMax) &&
                  (this.state.proteinMax === "" || recipe.protein < +this.state.proteinMax) &&
                  (recipe.percentage > (+this.state.percentage) * 10) &&
                  (recipe.rating >= +this.state.rating) 
        })
        this.setState({results: filtered});
      }
    )
  }

  componentDidMount() {
    this.updateRecipes()
  }

  createCards = () => {
    const cards = this.state.results.map((recipe, index) => 
      <Card id={recipe.id.toString()}
            title={recipe.title}
            percentage={recipe.percentage}
            required={recipe.unmatched.length}
            key={recipe.id}></Card>
    );

    const rows = []

    if (cards.length === 0) {
      rows.push( <h2>No Results Found</h2> )
    }
    else {
      rows.push( <h2>Showing {cards.length} Results</h2> )
    }
    
    for (let i = 0; i < cards.length; i = i + 4) {
      rows.push(<div className="row">{cards.slice(i, i+4)}</div>)
      rows.push(<br></br>)
    }

    return rows
  }

  setDiet(e) {
    this.setState({diet: e.target.value})
  }

  setAllergy(e) {
    let newAllergies = this.state.allergy;
    newAllergies[e.target.value] = !newAllergies[e.target.value]
    this.setState({allergy: newAllergies})
    console.log(e.target);
  }

  setPercentage(e) {
    console.log(e.target.value);
    this.setState({percentage: e.target.value})
  }

  setRating(e) {
    console.log(e.target.value);
    this.setState({rating: e.target.value})
  }

  setMax(val, maxType) {
    const regex = new RegExp("^[0-9]+$");
    const newValue = val.match(regex) ? val : "";
    this.setState({[maxType]: newValue}, () => console.log(this.state[maxType]));
  }
  
  applyFilter() {
    this.updateRecipes()
  }

  render() {
    return(
      <div>
        <link rel="stylesheet" href="Results.css" />
        <div className="filterPanel">
          <img src={ require('./logo.png') } id="rgLogo" alt="Recipe Guru"></img>
          <h3 id="filterTitle">Filter Results</h3>
            
          <button onClick={this.applyFilter.bind(this)}
                  className="card filterCard" id="applyButton">Apply Filter</button>

          <div className="staticCard filterCard">
            <h4 className="filterSubtitle">Percentage Match</h4>
            <input type="range" className="percentageSlider" min="0" max="10" value={this.state.percentage} onChange={this.setPercentage.bind(this)}/>
            <p className="filterText">At least {(+this.state.percentage) * 10}%</p>
          </div>
            
          <div className="staticCard filterCard">
            <h4 className="filterSubtitle">Diet</h4>
            <div onChange={this.setDiet.bind(this)}>
              <input type="radio" name="Diet" value="None" /> <label className="filterText"> None </label> <br></br>
              <input type="radio" name="Diet" value="Vgn" /><label className="filterText"> Vegan</label> <br></br>
              <input type="radio" name="Diet" value="Vgt" /> <label className="filterText"> Vegetarian</label>  <br></br>
              <input type="radio" name="Diet" value="Pesc" /> <label className="filterText"> Pescatarian</label> <br></br>
            </div>
          </div>
            
          <div className="staticCard filterCard">
            <h4 className="filterSubtitle">Allergy</h4>
            <div onChange={this.setAllergy.bind(this)}>
              <input type="checkbox" name="Allergy" value="Dairy" /> <label className="filterText"> Dairy </label> <br></br>
              <input type="checkbox" name="Allergy" value="Gluten" /> <label className="filterText"> Gluten </label> <br></br>
              <input type="checkbox" name="Allergy" value="Fish" /> <label className="filterText"> Fish </label> <br></br>
              <input type="checkbox" name="Allergy" value="Nuts" /> <label className="filterText"> Nuts </label> <br></br>
              <input type="checkbox" name="Allergy" value="Shellfish" /> <label className="filterText"> Shellfish </label> <br></br>
            </div>
          </div>

          <StatFilterCard name="Calories" unit=" calories"
                          onChange={(e) => this.setMax(e.target.value, "caloriesMax")}
                          value={this.state.caloriesMax}/>
          <StatFilterCard name="Fat" unit=" grams"
                          onChange={(e) => this.setMax(e.target.value, "fatMax")}
                          value={this.state.fatMax}/>
          <StatFilterCard name="Sodium" unit=" milligrams"
                          onChange={(e) => this.setMax(e.target.value, "sodiumMax")}
                          value={this.state.sodiumMax}/>
          <StatFilterCard name="Protein" unit=" grams"
                          onChange={(e) => this.setMax(e.target.value, "proteinMax")}
                          value={this.state.proteinMax}/>

          <div className="staticCard filterCard">
            <h4 className="filterSubtitle">Rating</h4>
            <input type="range" className="percentageSlider" min="0" max="5" value={this.state.rating} onChange={this.setRating.bind(this)}/>
            <p className="filterText">At least {this.state.rating}/5</p>
          </div>
        </div>

        <div className = "results">
          <h2 id="resultsTitle">
            Results
          </h2>
          {this.createCards()}
        </div>
      </div>
    )
  }

}

function StatFilterCard(props) {
  return (
    <div className="staticCard filterCard">
      <h4 className="filterSubtitle">{props.name}</h4>
      <p className="filterText">
        {"Less than "}
        <input  type="number"
                className="numberSlider"
                onChange={props.onChange}
                value={props.value}/>
        {props.unit}
      </p>
    </div>
  )
}

function Card(props) {
  return (
    <div>
      <div className="column">
        <div className="card">
          <Link href={"/recipe/"+props.id}><h4 className="recipeName"><b>{props.title}</b></h4></Link>
          <hr></hr>
          <p className="percentage">{props.percentage}%</p>
          <p className="requiredIng">Requires <b>{props.required}</b> more ingredients</p>
        </div>
      </div>
    </div>
  )
}

export default Results