import React, { Component } from 'react';
import Home from '../pages/Home';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
        <div className="App">
          <Home/>
        </div>
    );
  }
}

export default App;