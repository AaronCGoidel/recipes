import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Book extends React.Component {
  render() {
    return (
        <div>
          <Dialog fullScreen open={this.props.open}
                  TransitionComponent={Transition}
                  onClose={this.props.handleClose}
          >
            <AppBar>
              <Toolbar>
                <IconButton style={{marginRight: '20px'}}
                            color="inherit" onClick={this.props.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                  {this.props.title}
                </Typography>
              </Toolbar>
            </AppBar>
            <h1>
              Test
            </h1>
          </Dialog>
        </div>
    )
  }
}

export default Book;