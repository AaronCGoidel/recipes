import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../pages/Home';
import Library from '../pages/Library';
import FourPage from '../pages/404';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './style/theme';

import './style/App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      idToken: '',
      loggedIn: false
    }
  }

  componentDidMount = async() => {
    if(localStorage.getItem('idToken')){
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: localStorage.getItem('idToken')
        })
      });
      const body = await response.json();
      if(body.authenticated === true){
        this.setState({
          id: body.user.sub,
          loggedIn: true
        })
      }
    }
  };

  googleLoginResponse = async (res) => {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: res.tokenId,
      })
    });

    const body = await response.json();
    if(body.authenticated === true){
      localStorage.setItem('idToken', res.tokenId);
      this.setState({
        id: body.user.sub,
        loggedIn: true
      })
    }
  };

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Switch>
              <Route exact path={'/'} render={(props) => (
                  <Home {...props}
                        isLoggedIn={this.state.loggedIn}
                        id={this.state.id}
                        successAction={e => {this.googleLoginResponse(e)}}
                  />
              )}/>
              <Route path={'/l/:id'} render={(props) => (
                  <Library {...props}
                           toggleLoggedIn={e => {
                             this.setState({loggedIn: !this.state.loggedIn});
                           }}
                           buttonAction={e => {
                    window.location = '/';
                    this.setState({
                      loggedIn: false
                    });
                    localStorage.clear()
                  }}/>
              )} />
              <Route path="*" component={FourPage}/>
            </Switch>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;