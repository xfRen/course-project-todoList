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
      return todos.map(function(todo) {
        if (todo.id === action.id) {
          // return a new object so that todo (original object) will not be mutated
          var updatedCompleted = !todo.completed;
          return {
            ...todo,
            completed: updatedCompleted,
            completedAt: updatedCompleted ? moment().unix() : undefined
          };
        }
        return todo;
      });

      // Object.assign() also works here:
      // return todos.map((todo) => {
      //   var rTodo = Object.assign({}, todo);
      //   if (rTodo.id === action.id) {
      //     rTodo.completed = !rTodo.completed;
      //     rTodo.completedAt = rTodo.completed ? moment().unix() : undefined;
      //   }
      //   return rTodo;
      // });

      // return todos.map((todo) => {
      //   if(todo.id === action.id) {
      //     var updatedCompleted = !todo.completed;
      //     return Object.assign({}, todo, {
      //       completed : updatedCompleted,
      //       completedAt : (updatedCompleted ? moment().unix() : undefined)
      //     });
      //   }
      //   return todo;
      // });
    default:
      return todos;
  };
};
