import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = ({active}) => {
  return (
      <div>
        {active ? <CircularProgress size={60}/> : null}
      </div>
  )
};

export default LoadingSpinner;
