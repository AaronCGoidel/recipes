import React from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = {
  book: {
    height: '275px',
    width: '180px',
    margin: '20px'
  }
};

class Book extends React.Component {
  render(){
    const { classes } = this.props;
    return (
        <div>
          <Card className={classes.book}>
            <Typography variant={"headline"}>
              {this.props.title}
            </Typography>
          </Card>
        </div>
    )
  }
}

export default withStyles(styles)(Book);
