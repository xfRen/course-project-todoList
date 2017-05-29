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

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
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
    return TodoAPI.addTodo(newTodo).then((response) => {
      dispatch(addTodo(response));
    }).catch((error) => {
      if (error) {
        console.log('The new todo is not added properly.', error);
      }
    });
  };
};
