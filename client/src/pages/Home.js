import React from 'react';
// Google Login
import Button from '@material-ui/core/Button';
import LoginOverlay from '../components/LoginOverlay';


class Home extends React.Component {
  googleLoginResponse = async (response) => {
    console.log(response);

    this.setState({isLoggedIn: true});

    const ms = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: response.tokenId,
      })
    });
  };

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
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
        <h1>LOGGED IN</h1>
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