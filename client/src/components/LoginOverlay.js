import React from 'react';

import GoogleLogin from 'react-google-login';

// Material components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LoginOverlay extends React.Component {
  render () {
    return (
      <div>
        <Dialog
            open={!this.props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Sign in to get cookin'"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Click the button below to sign in using your Google account and get started writing recipes.
            </DialogContentText>
            <GoogleLogin
                style={{
                  "marginTop": "10px",
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
                onSuccess={this.props.onSuccess}
                onFailure={e => {console.log(e)}}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default LoginOverlay;