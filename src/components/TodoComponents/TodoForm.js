import React from 'react';

const TodoForm = (props) => {
  return(
    <div className="form-wrapper">
      <form onSubmit={props.handleSubmit}>
        <input type="text" name="todo_name" placeholder="What do you need to do?" 
          onChange={props.handleOnChange}
          value={props.inputValue}
        />
        <input type="submit" value="Add TODO"/>
        <input type="button" value="Clear completed" onClick={props.handleClearCompleted}/>
      </form>
    </div>
  );
}

export default TodoForm;