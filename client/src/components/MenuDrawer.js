import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class MenuDrawer extends React.Component {
  render () {
    let sideList = (
          <List component="nav">
            <ListItem button>
              <ListItemText inset primary="Item One" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Item Two" />
            </ListItem>
          </List>
    );
    return (
        <Drawer open={this.props.open} onClose={this.props.toggleOpen}>
          <div
              tabIndex={0}
              role="button"
              onClick={this.props.toggleOpen}
              onKeyDown={this.props.toggleOpen}
          >
            {sideList}
          </div>
        </Drawer>
    )
  }
}

export default MenuDrawer;