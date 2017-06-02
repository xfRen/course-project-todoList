import moment from 'moment';

export var searchTextReducer = (searchText = '', action) => {
  switch(action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return searchText;
  };
};

export var showCompletedReducer = (showCompleted = false, action) => {
  switch(action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !showCompleted;
    default:
      return showCompleted;
  };
};

export var todosReducer = (todos = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        action.todo
      ];
    case 'GET_TODOS':
      return action.todos;
    case 'UPDATE_TODO':
      return todos.map((todo) => {
        if (todo.id === action.id) {
          // return a new object so that todo (original object) will not be mutated
          return {
            ...todo,
            ...action.updates
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

export var authReducer = (auth = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return auth;
  };
};
