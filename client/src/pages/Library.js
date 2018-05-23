import React from 'react';
import AppMenu from '../components/MenuBar';
import Typography from '@material-ui/core/Typography';


class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    };
  }

  parseLibraryId(){
    console.log(this.props);
    return this.props.match.params.id;
  }

  componentDidMount = async() => {
    let userId = this.parseLibraryId();
    const result = await fetch('/check_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userId,
      })
    }).catch(function(err) {

    });

    const body = await result.json();

    if(body.isuser){
      this.setState({
        id: userId,
        name: body.fname
      });
    }
  };

  render () {
    return (
        <div>
          <AppMenu name={this.state.name +"'s Library"}
                   buttonAction={this.props.buttonAction}
          />
          <div style={{
            width: '100%',
            height: `calc(100vh - 64px)`,
            background: 'linear-gradient(to right, #4568dc, #b06ab3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Typography style={{color: '#ffffff'}} variant="display3">
              Welcome to your library!
            </Typography>
          </div>
        </div>
    )
  }
}

export default Library