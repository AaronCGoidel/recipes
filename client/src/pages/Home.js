import React from 'react';
// Google Login
import Button from '@material-ui/core/Button';
import LoginOverlay from '../components/LoginOverlay';

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
      this.setState({isLoggedIn: true, user: cookies.get('user-sess')});
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
    this.setState({isLoggedIn: true, user: body.sub});
  };

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      user: ''
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
            <h1>LOGGED IN</h1>
            <Button variant="raised" color={'primary'} onClick={e => {
              this.setState({
                isLoggedIn: false,
                user: ''
              });
              cookies.set('user-sess', 'none');
            }}>
              Sign Out
            </Button>
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