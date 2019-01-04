import React from 'react';


class SignUp extends React.Component {

  
    goGuru() {
      window.location.href = "/";
    }
  
    render() {
      return (
        <div>
          <div style={{width: "100%"}}>
            <img src={ require('./logo.png') } alt="logo" height="200" width="200" style={{display: "block", margin: "auto" }}/>
          </div>
          <h1 id="arTitle">404 - Page Not Found</h1>
          <p style={{textAlign: "center"}}>
            The page you are looking for cannot be found, please use the following link to return to the home page: 
          </p>
          <div id="goGuru">
            <button type="button" id="submit" className="card"
                    onClick={() => this.goGuru()}>GO GURU!</button>
          </div>
        </div>
      );
    }
  }



export default SignUp;
