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
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Sign in to get cookin'"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Click the button below to sign in using your Google account and get started writing recipes.
            </DialogContentText>
            <DialogActions>
            <GoogleLogin
                style={{
                  "marginTop": "20px",
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
                clientId={process.env.CLIENT_ID}
                onSuccess={this.props.onSuccess}
                onFailure={e => {console.log(e)}}
            />
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default LoginOverlay;