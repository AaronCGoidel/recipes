import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuDrawer from './MenuDrawer';

const styles = {
  root: {
    height: '64px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'center',
  },
  flex_one: {
    flex: '1 1 auto',
    textAlign: 'left',
  },
  flex_zero: {
    flex: '0 1 auto',
    alignSelf: 'auto'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    flex: '0 1 auto',
    alignSelf: 'auto'
  },
};

class AppMenu extends React.Component {
  state={
    drawerOpen: false
  };
  render() {
    const {classes} = this.props;
    return (
        <div>
          <MenuDrawer open={this.state.drawerOpen} toggleOpen={(e) => this.setState({
            drawerOpen: false
          })}/>
          <AppBar position="static" color={'default'} style={{height: '64px'}}>
            <Toolbar className={classes.root}>
              <IconButton className={classes.menuButton} color="inherit"
                          aria-label="Menu"
                          onClick={(e) => this.setState({
                            drawerOpen: true
                          })}
              >
                <MenuIcon style={{fontSize: 32}}/>
              </IconButton>
              <Typography variant="title" color="inherit"
                          className={classes.flex_one}>
                {this.props.name}
              </Typography>
              <Button onClick={this.props.buttonAction}
                      className={classes.flex_zero}>Log Out</Button>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}


AppMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMenu);
