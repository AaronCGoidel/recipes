import React from 'react';
import Add from '@material-ui/icons/Add';


const AddButton = () => {
  return (
      <div style={
        {
          height: '198px',
          width: '158px',
          margin: '20px',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column',
          color: 'rgba(255, 255, 255, 0.7)',
          border: '2px dashed rgba(255, 255, 255, 0.7)',
          borderRadius: '2px',
        }}>
        <div><Add style={{fontSize: 32}}/></div>
      </div>
  );
};

export default AddButton;
