import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Book, Edit, Home} from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class MenuDrawer extends React.Component {
  state = {
    open: true,
    showNewBook: false,
    bookTitle: ''
  };

  handleClick = () => {
    this.setState({ open: !this.state.open, showNewBook: this.state.showNewBook });
  };

  handleCloseNewBook = (total) => {
    if(total){
      this.setState({open: !this.state.open, showNewBook: false});
    }else{
      this.setState({showNewBook: false});
    }
  };

  render () {
    let sideList = (
          <List component="nav" subheader={<ListSubheader component="div">Let's Get Cookin'</ListSubheader>}>
            <ListItem button>
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
              <ListItemText inset primary="My Library" />
            </ListItem>
            <ListItem button onClick={() => this.setState({open: this.state.open,
              showNewBook: true})}>
              <ListItemIcon>
                <Edit/>
              </ListItemIcon>
              <ListItemText inset primary="New Book" />
            </ListItem>
            <Divider/>
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <Book/>
              </ListItemIcon>
              <ListItemText inset primary="My Books" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              </List>
            </Collapse>
          </List>
    );
    return (
        <Drawer open={this.props.open} onClose={this.props.toggleOpen}>
          <div
              tabIndex={0}
              role="button"
              onKeyDown={this.props.toggleOpen}
          >
            {sideList}
          </div>
          {this.state.showNewBook ?
              <div>
                <div>
                  <Dialog
                      open={this.state.showNewBook}
                      onClose={this.handleCloseNewBook}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Make a New Cookbook"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Organize your recipes by putting them in books.
                      </DialogContentText>
                      <TextField
                          required
                          id="with-placeholder"
                          label="With placeholder"
                          placeholder="Placeholder"
                          fullWidth
                          margin="normal"
                          onChange={e => {this.setState({bookTitle: e.target.value})}}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseNewBook} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => {this.props.callback(this.state.bookTitle);
                        this.handleCloseNewBook(true)}} color="primary" autoFocus>
                        Create
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div> :
              null
          }
        </Drawer>
    )
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);
