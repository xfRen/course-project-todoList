import moment from 'moment';
import TodoAPI from 'TodoAPI';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var getTodos = (todos) => {
  return {
    type: 'GET_TODOS',
    todos
  };
};

//async action
export var callAddTodo = (text) => {
  // Dispatch is passed in because we configured redux to use the thunk middleware.
  // The thunk library calls dispatched functions with the dispatch argument.
  // This makes it easy to dispatch another action when your asynchronous code is done.
  return (dispatch, getState) => {
    var newTodo = {
      text: text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    return TodoAPI.addTodo(newTodo).then((todo) => {
      dispatch(addTodo(todo));
    }).catch((error) => {
      if (error) {
        console.log('Error in callAddTodo:', error);
      }
    });
  };
};

export var callToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    // var state = getState(); // getState() can return the state if called
    return TodoAPI.updateTodo(id, completed).then((updates) => {
      dispatch(updateTodo(id, updates));
    }).catch((error) => {
      if (error) {
        console.log('Error in callToggleTodo:', error);
      }
    });
  };
};

export var fetchTodos = () => {
  return (dispatch, getState) => {
    return TodoAPI.getTodos().then((todos) => {
      dispatch(getTodos(todos));
    }).catch((error) => {
      if (error) {
        console.log('Error in fetchTodos:', error);
      }
    });
  };
};
