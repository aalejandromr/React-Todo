import React from 'react';
import TodoForm from './components/TodoComponents/TodoForm'
import TodoList from './components/TodoComponents/TodoList'
import './components/TodoComponents/Todo.css';
import { faPlusSquare, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  ToastConsumer,
  ToastProvider,
  withToastManager,
} from 'react-toast-notifications';
import Home from './components/HomeWithToast';
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
    this.notificationSystem = React.createRef();
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

  onlineCallback = () => {
    this.props.toastManager.remove(this.offlineToastId);
    this.offlineToastId = null;
  };
  
  handleFormSubmit = (event, props) => {
    // console.log(toastManager);
    const { toastManager } = props;
    // console.log(toastManager);
    event.preventDefault();
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    });
    this.setState(prevState => {
      // console.log(prevState.)
      if(prevState.todo === ""){
        toastManager.add(
          'Something went wrong: Seems like you were trying to add an empty task', {
          appearance: "error",
          autoDismiss: true,
          pauseOnHover: false
        });
        return {
          todoList: [...prevState.todoList]
        }
      } else {
        return {
          todoList: [...prevState.todoList, {
            id: prevState.count,
            todo_name: prevState.todo,
            due_date: Date.now(),
            completed: false,
            class: ""
          }]
        }
      }
    });
    this.setState({todo: ""})
    // console.log(this.props);
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
        <ToastProvider>
          <TodoForm 
            handleSubmit={this.handleFormSubmit} 
            handleOnChange={this.handleChange}
            inputValue={this.state.todo}
            handleClearCompleted={this.handleClearCompleted}
            handleSearch={this.handleSearch}
            searchInputValue={this.state.searchInputValue}
          />
        </ToastProvider>
        <TodoList lists={this.state.todoList} handleOnListClick={this.handleListClick}/>
      </div>
    );
  }
}

// wrap your component to pass in the `toastManager` prop

// const App = () => (

//   <ToastProvider>
//     <Home />

//     {/* or if render props are more your speed */}
//     <ToastConsumer>
//       {({ add }) => (
//         <button onClick={(e) => add(`Notified by ${e.target}`, {
//           appearance: 'info'
//         })}>
//           Toasty
//         </button>
//       )}
//     </ToastConsumer>
//   </ToastProvider>

// );
export default App;
