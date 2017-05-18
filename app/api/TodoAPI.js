// This is not a React component.
// This just a set of methods that we can call to get and save todos to localStorage.
module.exports = {
  setTodos: function(todos) {
    if ($.isArray(todos)) {
      // setItem takes two arguments: the key and the value, both need to be strings
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos; // if todos is not array, undefined will be returned.
    }
  },
  getTodos: function() {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    try { // try catch block is necessary here because JSON.parse() can fail
      todos = JSON.parse(stringTodos);
    } catch(error) {

    }
    if ($.isArray(todos)) {
      return todos;
    } else {
      return [];
    }
  },
  filterTodos: function(todos, showCompleted, searchText) {
    var filteredTodos = todos;
    // filter by showCompleted
    if (!showCompleted) {
      filteredTodos = filteredTodos.filter(function(todo) {
        return !todo.completed;
      });
    }
    // filter by searchText
    if (typeof searchText === 'string' && searchText.length > 0) {
      filteredTodos = filteredTodos.filter(function(todo) {
        var text = todo.text.toLowerCase();
        if (text.indexOf(searchText) !== -1) {
          return true;
        }
        return false;
      });
    }
    // sort todos with non-completed first
    filteredTodos.sort(function(a, b) {
      if (!a.completed && b.completed) {
        return -1; // -1 means a should come before b
      } else if (a.completed && !b.completed) {
        return 1; // 1 means a should come after b
      } else {
        return 0; // 0 means a is equal to b and no need to re-order
      }
    });
    return filteredTodos;
  }
};
