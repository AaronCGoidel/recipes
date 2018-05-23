import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Library from '../pages/Library';
import LoginOverlay from '../components/LoginOverlay';

import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid: '',
      firstName: ''
    }
  }

  componentDidMount = async() => {
    if(localStorage.getItem('loggedIn') !== 'true'){
      let usersessionid = localStorage.getItem('user-session');
      const result = await fetch('/check_user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: usersessionid,
        })
      }).catch(function(err) {

      });

      const body = await result.json();

      if(body.isuser){
        this.setState({
          userid: usersessionid,
          firstName: body.fname
        });
        localStorage.setItem('loggedIn', true)
      }
    }
  };

  googleLoginResponse = async (response) => {
    const authenticated = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: response.tokenId,
      })
    });

    const body = await authenticated.json();
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('user-session', body.sub);
    this.setState({
      userid: body.sub,
      firstName: body.given_name
    });
  };

  render() {
    let body = null;
    if(localStorage.getItem('loggedIn') === 'true'){
      body = (
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/l/:id'} render={(props) => (
                <Library {...props} buttonAction={e => {
                  window.location = '/';
                  this.setState({
                    userid: ''
                  });
                  localStorage.setItem('loggedIn', false);
                  localStorage.setItem('user-session', 'none');
                }}/>
            )} />
          </Switch>
      );
    }else{
      body = (
          <div>
            <LoginOverlay onSuccess={e => {this.googleLoginResponse(e)}}/>
          </div>
      );
    }
    return (
        <div className="App">
          {body}
        </div>
    );
  }
}

export default App;