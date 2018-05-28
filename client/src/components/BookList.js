import React from 'react';
import Book from './Book';
import AddButton from './AddButton';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import List from  '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

export class BookGrid extends React.Component {
  render() {
    let counter = 0;
    const books = this.props.books;
    const listItems = books.map((book) =>
        <Book key={`book_${counter++}`}title={book.title}/>
    );
    return (
        <Grid style={{maxWidth: '100%', marginTop: '64px'}} container spacing={16} alignItems={'flex-start'}>
          {listItems}
          <AddButton buttonAction={this.props.buttonAction}/>
        </Grid>
    );
  }
}

export class BookList extends React.Component {
  render() {
    let counter = 0;
    const listItems = this.props.books.map((book) =>
        <ListItem button key={`book_${counter++}`}>
          <ListItemText inset primary={book.title}/>
        </ListItem>
    );
    return (
      <List component="div" disablePadding>
        {listItems}
      </List>
    )
  }
}