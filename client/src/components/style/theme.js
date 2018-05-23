import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import * as Colors from '@material-ui/core/colors'

export default createMuiTheme(
    {
      // overrides: {
      //   MuiButton: {
      //     // Name of the rule
      //     root: {
      //       // Some CSS
      //       background: 'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)',
      //       borderRadius: 3,
      //       border: 0,
      //       color: 'white',
      //       height: 48,
      //       padding: '0 30px',
      //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      //     },
      //   },
      // },
      palette: {
        primary: {
          light: "#fbc02d",
          main: "#ffab00",
          dark: "#ff9100",
          contrastText: '#fff',
        },
        secondary: {
          light: "#ff80ab",
          main: "#f50057",
          dark: "#b71c1c",
          contrastText: '#ffffff',
        },
      },
    }
);