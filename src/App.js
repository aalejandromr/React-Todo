import React from 'react';
import TodoForm from './components/TodoComponents/TodoForm'
import TodoList from './components/TodoComponents/TodoList'
import './components/TodoComponents/Todo.css';

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor(){
    super();
    this.state = {
      todoList: [],
      todo: "",
      count: 2
    }
  }

  handleChange = (event) => {
    this.setState({todo: event.target.value})
  }

  handleListClick = (e, id) => {
    e.target.classList.toggle("done");
    let newTodos = [...this.state.todoList];
    newTodos[id].completed = !newTodos[id].completed;
    this.setState({todoList: newTodos});
  }
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({count: this.state.count + 1});
    this.setState({
      todoList: [...this.state.todoList, {
        id: this.state.count,
        todo_name: this.state.todo,
        due_date: Date.now(),
        completed: false
      }]
    });
    this.setState({todo: ""})
    // console.log(this.state.todoList);
  }

  handleClearCompleted = () => {
    let newTodoList = this.state.todoList.filter(list => !list.completed)
    this.setState({
      todoList: newTodoList
    });
  }

  render() {
    return (
      <div>
        <TodoList lists={this.state.todoList} handleOnListClick={this.handleListClick}/>
        <TodoForm 
          handleSubmit={this.handleFormSubmit} 
          handleOnChange={this.handleChange}
          inputValue={this.state.todo}
          handleClearCompleted={this.handleClearCompleted}
        />
      </div>
    );
  }
}

export default App;
