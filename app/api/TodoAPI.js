import firebase, {firebaseRef} from 'configureFirebase';
import moment from 'moment';
// This is not a React component.
// This just a set of methods that we can call to get and save todos to localStorage.
export default {
  setTodos: (todos) => {
    if ($.isArray(todos)) {
      // setItem takes two arguments: the key and the value, both need to be strings
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos; // if todos is not array, undefined will be returned.
    }
  },
  getTodos: () => {
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
  addTodo: (todo) => {
    var todoRef = firebaseRef.child('todos').push(todo);
    return todoRef.then((snapshot) => {
      return {
        ...todo,
        id: snapshot.key
      };
    }).catch((error) => {
      return error;
    });
  },
  updateTodo: (id, completed) => {
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    }
    return todoRef.update(updates).then(() => {
      return updates;
    }).catch((error) => {
      return error;
    });
  }
};
