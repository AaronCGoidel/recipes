import React from 'react';
import Typography from '@material-ui/core/Typography';

class FourPage extends React.Component {
  render () {
    return (
        <div>
          <Typography style={{
            color: '#ffffff',
            padding: '0 10px 8px'
          }} variant="display3">
            Oopsie Whoopsie!!
          </Typography>
          <Typography style={{
            color: '#ffffff',
            padding: '0 10px 8px'
          }} variant={"body2"}>
            uWu
          </Typography>
          <Typography style={{
            color: '#ffffff',
            padding: '0 10px 8px'
          }} variant="body2">
            we made a fucky wucky!!1 a wittle fucko boingo! <br/>
            the code monkies at our headquarters are working VEWY HAWD to fix this!
          </Typography>
        </div>
    )
  }
}

export default FourPage;