import React from 'react';
// Google Login
import LoginOverlay from '../components/LoginOverlay';
import AppMenu from '../components/MenuBar';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends React.Component {

  componentDidMount = async() => {
    const result = await fetch('/check_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: cookies.get('user-sess'),
      })
    });

    const body = await result.json();

    if(body.isuser){
      this.setState({
        isLoggedIn: true,
        userid: cookies.get('user-sess'),
        firstName: body.fname
      });
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
    cookies.set('user-sess', body.sub, { path: '/' });
    this.setState({
      isLoggedIn: true,
      userid: body.sub,
      firstName: body.given_name
    });
  };

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userid: '',
      firstName: ''
    }
  }

  render () {
    let body = null;

    if(!this.state.isLoggedIn){
      body = (
          <div>
            <LoginOverlay open={this.state.isLoggedIn} onSuccess={e => {this.googleLoginResponse(e)}}/>
          </div>
      )
    }else{
      body = (
          <div>
            <AppMenu name={this.state.firstName} buttonAction={e => {
              this.setState({
                isLoggedIn: false,
                userid: ''
              });
              cookies.set('user-sess', 'none');
            }}/>
            <h1>LOGGED IN</h1>
          </div>
    )
    }

    return (
        <div>
          {body}
        </div>
    )
  }
}

export default Home;