import React from 'react'
import { Redirect } from 'react-router-dom'


class SignUp extends React.Component {

  
    goGuru() {

        window.location.href = "/";
      }
  
    render() {
      return (
          <form>
                      <title>Recipe Guru</title>
        <div style={{width: "100%"}}>
          <img src={ require('./logo.png') } alt="logo" height="200" width="200" style={{display: "block", margin: "auto" }}/>
        </div>
          <label>
            The page you are looking for cannot be found, please use the following link to return to the home page: 
          </label>
          <div id="goGuru">
          <button type="button" id="submit" className="card"
                  onClick={() => this.goGuru()}>GO GURU!</button>
        </div>
        </form>      
      );
    }
  }



export default SignUp;
