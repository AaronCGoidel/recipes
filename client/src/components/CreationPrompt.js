import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const CreationPrompt = ({value, onChange, onConfirm, onCancel}) => {
  return (
      <div>
        <div>
          <Dialog
              open={true}
              onClose={this.handleCloseNewBook}
          >
            <DialogTitle>{"Make a New Cookbook"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Organize your recipes by putting them in books.
              </DialogContentText>
              <TextField
                  placeholder="Title"
                  fullWidth
                  margin="normal"
                  value={value}
                  onChange={onChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={onConfirm}
                color="primary" autoFocus>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
  )
};

export default CreationPrompt;
