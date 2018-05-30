import React from 'react';
import Card from '@material-ui/core/Card';
import withStyles from "@material-ui/core/styles/withStyles";

import Typography from '@material-ui/core/Typography';

const styles = {
  book: {
    height: '198px',
    width: '148px',
    margin: '20px',
    cursor: 'pointer'
  },
};

class Cover extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.title)
  };

  render() {
    const {classes} = this.props;
    return (
        <div onClick={this.handleClick}>
          <Card style={{display: 'flex', flexDirection: 'row', wordBreak: 'break-word', paddingRight: '5px'}}
                className={classes.book}>
            <div style={{
              flexBasis: '20px',
              backgroundColor: 'rgba(50, 50, 200, 0.8)',
            }}/>
            <Typography style={{
              flex: 1, textAlign:"left", marginTop:"20px", marginLeft:"10px", textTransform: 'capitalize'}}
                        variant={'headline'}>
              {this.props.title}
            </Typography>
          </Card>

        </div>
    );
  }
}

export default withStyles(styles)(Cover);
