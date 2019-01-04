import React from 'react';
import Logo from './Logo';


class SignUp extends React.Component {

  
    goGuru() {
      window.location.href = "/";
    }
  
    render() {
      return (
        <div>
          <Logo height="200" width="200"/>
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
