import React, { Component } from 'react';
import Home from '../pages/Home';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
  }

  render() {
    return (
        <div className="App">
          <Home/>
        </div>
    );
  }
}

export default App;