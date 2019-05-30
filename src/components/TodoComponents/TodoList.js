// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from 'react';

const TodoList = (props) => {
  return (
    // <div className="todo-list-wrapper">
    //   {
    //     props.lists.map(list => <div key={list.id} onClick={(e, l = list) => {
    //       props.handleOnListClick(e, l);
    //       }
    //     }> {list.todo_name}</div>)
    //   }
    // </div>
    <div className="todo-list-wrapper">
      <button className="view-all" onClick={props.handleClearFilter}> { /* props.view_all */ } View All </button>
      {
        props.lists.map( (list, index) => {
          // if(!list.completed) {
            return( 
              <div 
                key={list.id} 
                onClick={(e) => props.handleOnListClick(e, index)}
                className={list.class}
              > 
                  {list.todo_name}
              </div>)
          // }
        })
      }
    </div>
  )
}

export default TodoList;