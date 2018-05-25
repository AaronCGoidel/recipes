import React from 'react';
import AppMenu from '../components/MenuBar';
import Typography from '@material-ui/core/Typography';
import {Gradient} from '../components/style/BackgroundGradient';
import BookList from '../components/BookList';
import MenuDrawer from '../components/MenuDrawer';



class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBookTitle: '',
      id: '',
      name: '',
      books: [],
      drawerOpen: false
    };
  }

  parseLibraryId(){
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
        name: body.fname,
      });
      const books = await fetch('/get_library', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId: userId,
        })
      });
      const bookData = await books.json();
      this.setState({
        books: bookData
      });
    }else{
      window.location = '/404';
    }
  };

  makeNewBook = async(dataFromChild) => {
    const newBookPromise = await fetch('/create_book', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId: this.state.id,
        bookTitle: dataFromChild
      })
    });
    const newBook = await newBookPromise.json();
    this.setState({books: newBook});
  };

  render () {
    let body = null;
    if(this.state.books.length > 0){
      body=(
          <BookList books={this.state.books}/>
      )
    }else{
      body=(
          <Typography style={{
            color: '#ffffff',
            padding: '0 10px'
          }} variant="display3">
            Welcome to your library!
          </Typography>
      )
    }
    return (
        <div>
          <MenuDrawer callback={this.makeNewBook} open={this.state.drawerOpen} toggleOpen={(e) => this.setState({
            drawerOpen: false
          })}/>
          <AppMenu name={this.state.name +"'s Library"}
                   buttonAction={this.props.buttonAction}
                   menuAction={e => this.setState({drawerOpen: !this.state.drawerOpen})}
          />
          <div style={{
            minHeight: `calc(100vh - 64px)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Gradient hasNav>
              {body}
            </Gradient>
          </div>
        </div>
    )
  }
}

export default Library