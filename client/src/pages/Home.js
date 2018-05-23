import React from 'react';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';


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
        <div style={{
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(to right, #4568dc, #b06ab3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Typography style={{color: '#ffffff'}} variant="display3">
            Let's Get Cookin'
          </Typography>
          {button}
        </div>
    )
  }
}

export default Home;