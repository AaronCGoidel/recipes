import React from 'react';
// Google Login
import GoogleLogin from 'react-google-login';
import Button from '@material-ui/core/Button';



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
            <GoogleLogin
                style={{
                  "display": "inline-block",
                  "background": "rgb(209, 72, 54)",
                  "color": "rgb(255, 255, 255)",
                  "width": "190px",
                  "paddingTop": "10px",
                  "paddingBottom": "10px",
                  "borderRadius": "2px",
                  "border": "1px solid transparent",
                  "fontSize": "16px",
                  "fontFamily": "Roboto"
                }}
                buttonText={'Sign in with Google'}
                clientId="786319502323-fqjsf84cnqh79phubfcnnlior07hf385.apps.googleusercontent.com"
                onSuccess={e => {
                  this.googleLoginResponse(e)}}
                onFailure={e => {console.log(e)}}
            />
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