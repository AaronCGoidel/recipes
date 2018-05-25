import React from 'react';
import Book from './Book';
import AddButton from './AddButton';
import Grid from '@material-ui/core/Grid';

class BookList extends React.Component {
  render() {
    const books = this.props.books;
    const listItems = books.map((book) =>
        <Book title={book.title}/>
    );
    return (
        <Grid style={{maxWidth: '100%', marginTop: '64px'}} container spacing={16} alignItems={'flex-start'}>
          {listItems}
          <AddButton/>
        </Grid>
    );
  }
}

export default (BookList);