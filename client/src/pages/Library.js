import React from 'react';
import AppMenu from '../components/MenuBar';
import {CoverGrid, CoverList} from '../components/CoverList';
import MenuDrawer from '../components/MenuDrawer';
import CreationPrompt from '../components/CreationPrompt';
import Book from '../components/Book';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBookTitle: '',
      id: '',
      name: '',
      books: [],
      showNewBook: false,
      drawerOpen: false,
      bookOpen: false,
      barColor: 'default',
      currentBook: '',
      delete: false
    };
  }

  parseLibraryId() {
    return this.props.match.params.id;
  }

  componentDidMount = async () => {
    let userId = this.parseLibraryId();
    const result = await fetch('/check_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userId,
      }),
    }).catch(function(err) {

    });

    const body = await result.json();

    if (body.isuser) {
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
        }),
      });
      const bookData = await books.json();
      this.setState({
        books: bookData,
      });
    } else {
      window.location = '/404';
    }
  };

  deleteBook = async (id) => {
    let temp = this.state.books;
    for(let i = temp.length - 1; i >= 0; i--) {
      if(temp[i].uuid === id) {
        temp.splice(i, 1);
        this.setState({books: temp});
      }
    }
    fetch('/delete_book', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });
  };

  makeNewBook = async (dataFromChild) => {
    const newBookPromise = await fetch('/create_book', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId: this.state.id,
        bookTitle: dataFromChild,
      }),
    });
    const newBook = await newBookPromise.json();
    this.setState({books: newBook});
  };

  toggleNewDialogue = () => {
    this.setState({showNewBook: !this.state.showNewBook});
  };

  handleCloseDialogue = () => {
    this.toggleNewDialogue();
    this.setState({newBookTitle: '', drawerOpen: false});
  };

  handleOpenBook = (title) => {
    this.setState({bookOpen: true, currentBook: title});
  };

  render() {
    let creationDialogue = null;

    if (this.state.showNewBook) {
      creationDialogue = (
          <CreationPrompt value={this.state.newBookTitle}
                          onChange={e => this.setState(
                              {newBookTitle: e.target.value})}
                          onCancel={this.handleCloseDialogue} onConfirm={() => {
            this.handleCloseDialogue();
            this.makeNewBook(this.state.newBookTitle);
          }}/>
      );
    }

    return (
        <div style={{width: '100%'}}>
          <MenuDrawer callback={this.makeNewBook} open={this.state.drawerOpen}
                      toggleOpen={(e) => this.setState({drawerOpen: false})}
                      showNewBook={this.state.showNewBook}
                      toggleDialogue={this.toggleNewDialogue} id={this.state.id}>
            <CoverList books={this.state.books} onClick={this.handleOpenBook}/>
          </MenuDrawer>
          {creationDialogue}
          <AppMenu name={this.state.name + '\'s Library'}
                   buttonAction={this.props.buttonAction}
                   menuAction={e => this.setState(
                       {drawerOpen: !this.state.drawerOpen})}
                   color={this.state.barColor}
          />
          <CoverGrid books={this.state.books}
                     buttonAction={this.toggleNewDialogue}
                     onClick={this.handleOpenBook} delete={this.state.delete} deleteAction={this.deleteBook}/>
          <Book open={this.state.bookOpen} handleClose={e => this.setState({bookOpen: false})} title={this.state.currentBook}/>

          <Button variant="fab" color="default" style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px'
          }} onClick={e => this.setState({delete: !this.state.delete})}>
            <Delete/>
          </Button>
        </div>
    );
  }
}

export default Library;