import React from 'react';
import TodoForm from './components/TodoComponents/TodoForm'
import TodoList from './components/TodoComponents/TodoList'
import './components/TodoComponents/Todo.css';
import { faPlusSquare, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faPlusSquare, faTimesCircle);

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor(){
    super();
    this.state = {
      todoList: [],
      todo: "",
      count: 2,
      searchInputValue: ""
    }
  }

  handleChange = (event) => {
    this.setState({todo: event.target.value})
  }

  handleListClick = (e, id) => {
    e.target.classList.toggle("done");
    this.setState(prevState => {
      return {
        todoList: prevState.todoList.map((list, index) => {
          if(index === id) {
            list.completed = !list.completed;
          }
          return list;
        })
      }
    })
  }
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    });
    this.setState(prevState => {
      return {
        todoList: [...prevState.todoList, {
          id: prevState.count,
          todo_name: prevState.todo,
          due_date: Date.now(),
          completed: false,
          class: ""
        }]
      }
    });
    this.setState({todo: ""})
    // console.log(this.state.todoList);
  }

  handleClearCompleted = () => {
    this.setState(prevState => {
      return {
        todoList: prevState.todoList.filter(list => !list.completed)
      }
    })
  }

  handleSearch = (e) => {
    this.setState({searchInputValue: e.target.value});
    this.setState(prevState => {
      return {
        todoList: prevState.todoList.map(list => {
          let regex = new RegExp(prevState.searchInputValue, 'gi');
          if(!regex.test(list.todo_name)) {
            list.class = "filtered";
          } else {
            list.class = "";
          }
          return list;
        })
      }
    })
  }

  render() {
    return (
      <div className="list-wrapper">
        <TodoForm 
          handleSubmit={this.handleFormSubmit} 
          handleOnChange={this.handleChange}
          inputValue={this.state.todo}
          handleClearCompleted={this.handleClearCompleted}
          handleSearch={this.handleSearch}
          searchInputValue={this.state.searchInputValue}
        />
        <TodoList lists={this.state.todoList} handleOnListClick={this.handleListClick}/>
      </div>
    );
  }
}

export default App;
