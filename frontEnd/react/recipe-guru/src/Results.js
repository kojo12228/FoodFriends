import React, { Component } from 'react';
import $ from 'jquery';
import './Results.css'


export class Results extends Component {
    constructor(props) {
        super(props)
        let recipe = {
            title: "No Recipes",
            percentage: "0"
        };
        let recipe2 = {
            title: "Recipe 2",
            percentage: "123"
        };
        this.state = [recipe, recipe2];
    }

    componentDidMount() {
        $.getJSON("https://recipe-guru.appspot.com/api/v1/recipes?ing[]=Salt", (data) => {
            this.setState(data);
            
        })
    }

    createCards = () => {
        let parent = []
        let children = []
        console.log(Object.keys( this.state ).length)

        for (let i = 0; i < Object.keys( this.state ).length; i++) {
            children.push(
                <div>
                <div className="card">
                    <div className="container">
                        <h4 className="recipeName"><b>{this.state[i].title}</b></h4>
                        <hr></hr>
                        <p className="percentage">{this.state[i].percentage}%</p>
                        <p className="requiredIng">Requires <b>X</b> more ingredients</p>
                    </div>
                </div>
                <br></br>
                </div>
            )
        }

        parent.push(<div>{children}</div>)

        return parent;
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


export default Results