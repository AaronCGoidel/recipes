import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme(
    {
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