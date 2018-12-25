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
        let recipe3 = {
            title: "Recipe 3",
            percentage: "12233"
        };
        let recipe4 = {
            title: "Recipe 4",
            percentage: "1235235"
        };
        let recipe5 = {
            title: "Recipe 5",
            percentage: "123234234"
        };
        this.state = [recipe, recipe2, recipe3, recipe4, recipe5];
    }

    componentDidMount() {
        $.getJSON("https://recipe-guru.appspot.com/api/v1/recipes?ing[]=Salt", (data) => {
            this.setState(data);
            
        })
    }

    createCards = () => {
        let parent = []
        let children = []

        for (let i = 0; i < Object.keys( this.state ).length; i++) {
            children.push(
                <div>
                <div className="column">
                    <div className="card">
                        <h4 className="recipeName"><b>{this.state[i].title}</b></h4>
                        <hr></hr>
                        <p className="percentage">{this.state[i].percentage}%</p>
                        <p className="requiredIng">Requires <b>X</b> more ingredients</p>
                    </div>
                </div>
                </div>
            )
        }

        let tempChildren = []

        for (let i = 0; i < Object.keys( this.state ).length; i = i + 4) {
            tempChildren = [];
            for (let j = i; j < i + 4; j++) {
                tempChildren.push(children[j])
                if (j == Object.keys( this.state ).length - 1) {
                    break;
                }
            }
            parent.push(<div className="row">{tempChildren}</div>)
            parent.push(<br></br>)
            if (i == Object.keys( this.state ).length - 1) {
                break;
            }
        }

        

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