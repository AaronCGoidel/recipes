import React from 'react';
import AppMenu from '../components/MenuBar';

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
          <h1>{this.state.id}</h1>
        </div>
    )
  }
}

export default Library