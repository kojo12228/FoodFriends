import React, { Component } from 'react';
import $ from 'jquery';
import Router from 'react-router-component'
import './Results.css'
var Link = Router.Link;

export class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {results: []};
    }

    componentDidMount() {
        $.getJSON("https://recipe-guru.appspot.com/api/v1/recipes?ing[]=Salt", (data) => {
            this.setState({results: data});
            
        })
    }

    createCards = () => {
        const cards = this.state.results.map((recipe, index) => 
            <Card id={recipe.id.toString()} title={recipe.title} percentage={recipe.percentage} required="X"></Card>
        );

        const numRows = Math.floor(cards.length / 4)
        const rows = []

        for (let i = 0; i < numRows; i = i + 4) {
            rows.push(<div className="row">{cards.slice(i, i+4)}</div>)
            rows.push(<br></br>)
        }

        return rows
    }

    render() {


        return(
            <div>
            <link rel="stylesheet" href="Results.css" />
            <div className="filterPanel">
                <img src={ require('./logo.png') } id="rgLogo" alt="Recipe Guru"></img>
                <h3 id="filterTitle">Filter Results</h3>
                <h4 className="filterSubtitle">Percentage Match</h4>
                <p className="filterText">0 <input type="range" id="percentageSlider" min="0" max="10"></input> 100</p>
                <hr></hr>
                <h4 className="filterSubtitle">Diet</h4>
                <input type="radio" name="Diet" value="None" /> <label className="filterText"> None </label> <br></br>
                <input type="radio" name="Diet" value="Vegan" /><label className="filterText"> Vegan</label> <br></br>
                <input type="radio" name="Diet" value="Vegetarian" /> <label className="filterText"> Vegetarian"</label>  <br></br>
                <input type="radio" name="Diet" value="Pescatarian" /> <label className="filterText"> Pescatarian</label> <br></br>
                <hr></hr>
                <h4 className="filterSubtitle">Allergy</h4>
                <input type="checkbox" name="Allergy" value="Dairy" /> <label className="filterText"> Dairy </label> <br></br>
                <input type="checkbox" name="Allergy" value="Gluten" /> <label className="filterText"> Gluten </label> <br></br>
                <input type="checkbox" name="Allergy" value="Fish" /> <label className="filterText"> Fish </label> <br></br>
                <input type="checkbox" name="Allergy" value="Nuts" /> <label className="filterText"> Nuts </label> <br></br>
                <input type="checkbox" name="Allergy" value="Shellfish" /> <label className="filterText"> Shellfish </label> <br></br>
                <hr></hr>
                <h4 className="filterSubtitle">Calories</h4>
                <p className="filterText">Less than <input type="number" className="numberSlider" /> calories </p>
                <hr></hr>
                <h4 className="filterSubtitle">Fat</h4>
                <p className="filterText">Less than <input type="number" className="numberSlider" /> grams </p>
                <hr></hr>
                <h4 className="filterSubtitle">Sodium</h4>
                <p className="filterText">Less than <input type="number" className="numberSlider" /> milligrams </p>
                <hr></hr>
                <h4 className="filterSubtitle">Protein</h4>
                <p className="filterText">Less than <input type="number" className="numberSlider" /> grams </p>
                <hr></hr>
                <h4 className="filterSubtitle">Rating</h4>
                <p className="filterText">0 <input type="range" id="percentageSlider" min="0" max="5" /> 5 </p>
                <hr></hr>

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

function Card(props) {
    return (
        <div>
            <div className="column">
                <div className="card">
                    <Link href={"recipe/"+props.id}><h4 className="recipeName"><b>{props.title}</b></h4></Link>
                    <hr></hr>
                    <p className="percentage">{props.percentage}%</p>
                    <p className="requiredIng">Requires <b>{props.required}</b> more ingredients</p>
                </div>
            </div>
        </div>
    )
}

export default Results