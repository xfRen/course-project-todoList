import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import TodoAPI from 'TodoAPI';

import {configure} from 'configureStore';
import {fetchTodos} from 'actions';
import router from 'appRouter';
require('style!css!sass!appSass');

// import './../playground/firebase/index';

// The below solution would be fine for now.
// This is because our data is stored in localStorage and can be accessed via a synchronous API.
//
// In the next section, you'll be accessing the data from Firebase.
// This is a asynchronous API which means we'll have to wait for the data.
// It would be a bad idea to wait for the data before creating the store and rendering the React app.
// The bulk add option makes that scenario much easier to manage. You simply bulk add the todos whenever firebase responds.

// commented to dispatch an asynchronous action
// var initialTodos = TodoAPI.getTodos();
// var store = configure({todos: initialTodos});
var store = configure({});
store.dispatch(fetchTodos());

TodoAPI.authStateChanged();

// store.subscribe(() => {
//   var state = store.getState();
//   TodoAPI.setTodos(state.todos);
// });

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
