import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import CookieLogo from '../components/style/Logo';

import '../index.css'

class FourPage extends React.Component {
  render () {
    return (
        <div className={'columnar'} style={{background: '#ffffff'}}>
          <Typography variant={'display1'} style={{fontSize: '150px'}}>
            <span>4</span>
            <CookieLogo/>
            <span>4</span>
          </Typography>
        <Link style={{
            "width": '100px',
            "fontFamily": "Roboto",
            "display": 'block',
            "padding": '15px 35px',
            "background":'transparent',
            "border": '2px solid #E73C7E',
            "borderRadius": '30px',
            "fontSize": '1em',
            "fontWeight": '500',
            "color": '#E73C7E',
            "transition": '0.3s ease-in-out',
            "cursor": 'pointer',
            "outline": 0,
            "textDecoration": 'none'
          }} to={'/'}>Go Home</Link>
        </div>
    )
  }
}

export default FourPage;