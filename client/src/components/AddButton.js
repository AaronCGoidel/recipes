import React from 'react';
import Add from '@material-ui/icons/Add';
import './style/AddButton.css'


const AddButton = () => {
  return (
      <div className={'add-button'}>
        <div><Add style={{fontSize: 'inherit'}}/></div>
      </div>
  );
};

export default AddButton;
