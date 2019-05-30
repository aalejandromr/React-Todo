import React from 'react';
import {
  withToastManager
} from 'react-toast-notifications';

const Home = (props) => {

  return (
    <form onSubmit={(value) => {
      value.preventDefault();
      
      const { toastManager } = props;
  
        toastManager.add('Saved Successfully', { appearance: 'success' });
  
    }}>
      <input type="Submit"/>
    </form>
  )
}

// wrap your component to pass in the `toastManager` prop
export default withToastManager(Home);