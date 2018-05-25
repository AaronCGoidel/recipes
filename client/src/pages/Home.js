import React from 'react';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';

import '../index.css'

class Home extends React.Component {
  render () {
    let button = null;
    if(!this.props.isLoggedIn){
      button = (
          <GoogleLogin
              style={{
                "fontFamily": "Roboto",
                "display": 'block',
                "padding": '15px 35px',
                "background":'transparent',
                "border": '2px solid #ffffff',
                "borderRadius": '30px',
                "fontSize": '1em',
                "fontWeight": '500',
                "color": '#ffffff',
                "transition": '0.3s ease-in-out',
                "cursor": 'pointer',
                "outline": 0,
              }}
              buttonText={'Sign in with Google'}
              clientId="786319502323-fqjsf84cnqh79phubfcnnlior07hf385.apps.googleusercontent.com"
              onSuccess={this.props.successAction}
              onFailure={e => {console.log(e)}}
          />
      );
    }else{
      button = (
          <Link style={{
            "width": '100px',
            "fontFamily": "Roboto",
            "display": 'block',
            "padding": '15px 35px',
            "background":'transparent',
            "border": '2px solid #ffffff',
            "borderRadius": '30px',
            "fontSize": '1em',
            "fontWeight": '500',
            "color": '#ffffff',
            "transition": '0.3s ease-in-out',
            "cursor": 'pointer',
            "outline": 0,
            "textDecoration": 'none'
          }} to={'/l/' + localStorage.getItem('user-session')}>My Library</Link>
      )
    }
    return (
        <div className={'columnar'}>
          <Typography style={{
            color: '#ffffff',
            padding: '0 10px 8px'
          }} variant="display3">
            Let's Get Cookin'
          </Typography>
          {button}
        </div>
    )
  }
}

export default Home;