import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ToastConsumer,
  ToastProvider,
  withToastManager,
} from 'react-toast-notifications';


const TodoForm = (props) => {
  return(
    <div className="form-wrapper">
      <input type="text" onChange={props.handleSearch} 
      value={props.searchInputValue}
      placeholder="Search for todos"
      />
      <form onSubmit={(e) => {
          props.handleSubmit(e, props);
        }}>
        <input type="text" name="todo_name" placeholder="What do you need to do?" 
          onChange={props.handleOnChange}
          value={props.inputValue}
        />
        <div className="button-wrapper">
          <button type="submit">
            <FontAwesomeIcon icon={['far', 'plus-square']} />
          </button>
          <button type="button" onClick={props.handleClearCompleted}>
            <FontAwesomeIcon icon={['far', 'times-circle']} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default withToastManager(TodoForm);