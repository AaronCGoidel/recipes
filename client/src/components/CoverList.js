import React from 'react';
import Cover from './Cover';
import AddButton from './AddButton';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import List from  '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

export class CoverGrid extends React.Component {
  render() {
    let counter = 0;
    const books = this.props.books;
    const listItems = books.map((book) =>
        <Cover key={`book_${counter++}`} title={book.title} onClick={this.props.onClick}
               delete={this.props.delete} deleteAction={this.props.deleteAction} id={book.uuid}/>
    );
    return (
        <Grid style={{maxWidth: '100%', paddingTop: '80px'}} container spacing={16} alignItems={'flex-start'}>
          {listItems}
          <AddButton buttonAction={this.props.buttonAction}/>
        </Grid>
    );
  }
}

export class CoverList extends React.Component {
  render() {
    let counter = 0;
    const listItems = this.props.books.map((book) =>
        <ListItem button key={`book_${counter++}`} onClick={e => this.props.onClick(book.title)}>
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