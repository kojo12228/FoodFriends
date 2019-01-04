import React, { Component } from 'react';

class Logo extends Component {
  render() {
    return (
      <div style={{width: "100%"}}>
        <a href="/">
          <img src={ require('./logo.png') }
               alt="logo"
               height={this.props.height}
               width={this.props.width}
               style={{display: "block", margin: "auto" }}/>
        </a>
      </div>
    )
  }
}

export default Logo