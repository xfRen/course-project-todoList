const TodoAPI = require('TodoAPI');
const uuid = require('uuid');
const moment = require('moment');

export var searchTextReducer = function(searchText = '', action) {
  switch(action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return searchText;
  };
};

export var showCompletedReducer = function(showCompleted = false, action) {
  switch(action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !showCompleted;
    default:
      return showCompleted;
  };
};

export var todosReducer = function(todos = TodoAPI.getTodos(), action) {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];
    case 'TOGGLE_TODO':
      var updatedTodos = todos.map(function(todo) {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          if (todo.completed) {
            todo.completedAt = moment().unix();
          } else {
            todo.completedAt = undefined;
          }
        }
        return todo;
      });
      return updatedTodos;
    default:
      return todos;
  };
};
