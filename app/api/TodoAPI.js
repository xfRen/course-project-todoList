import firebase, {firebaseRef, githubProvider} from 'configureFirebase';
import moment from 'moment';
import {browserHistory} from 'react-router';

import {login, logoutObject} from 'actions';
// This is not a React component.
// This just a set of methods that we can call to get and save todos to localStorage.
export default {
  // setTodos: (todos) => {
  //   if ($.isArray(todos)) {
  //     // setItem takes two arguments: the key and the value, both need to be strings
  //     localStorage.setItem('todos', JSON.stringify(todos));
  //     return todos; // if todos is not array, undefined will be returned.
  //   }
  // },
  // getTodos: () => {
    // var stringTodos = localStorage.getItem('todos');
    // var todos = [];
    // try { // try catch block is necessary here because JSON.parse() can fail
    //   todos = JSON.parse(stringTodos);
    // } catch(error) {
    //
    // }
    // if ($.isArray(todos)) {
    //   return todos;
    // } else {
    //   return [];
    // }
  // },
  getTodos: () => {
    var todosRef = firebaseRef.child('todos');
    return todosRef.once('value').then((snapshot) => {
      if (snapshot !== null && snapshot.val() !== null) {
        var todoObjects = snapshot.val();
        return Object.keys(todoObjects).map((todoId) => {
          return {
            id: todoId,
            ...todoObjects[todoId]
          };
        });
      }
      return [];
      // Andrew's solution is as follows:
      // var todoObjects = snapshot.val() || {};
      // var parsedTodos = [];
      // Object.keys(todoObjects).forEach((todoId) => {
      //   parsedTodos.push({
      //     id: todoId,
      //     ...todoObjects[todoId]
      //   });
      // });
      // return parsedTodos;
    }, (error) => {
      return error;
    });
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
  },
  loginWithGithub: () => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      return result;
    }).catch((error) => {
      return error;
    });
  },
  logout: () => {
    return firebase.auth().signOut().then(() => {
      return true;
    }).catch((error) => {
      return error;
    });
  },
  authStateChanged(store) {
    return firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged');
      if (user) {
        if (typeof store !== 'undefined' && store !== null) {
          store.dispatch(login(user.uid));
        }
        browserHistory.push('/todos');
      } else {
        if (typeof store !== 'undefined' && store !== null) {
          store.dispatch(logoutObject());
        }
        browserHistory.push('/');
      }
    });
  }
};
