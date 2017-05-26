const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const TodoApp = require('TodoApp');
const TodoAPI = require('TodoAPI');

const configureStore = require('configureStore');
require('style!css!sass!appSass');

// The below solution would be fine for now.
// This is because our data is stored in localStorage and can be accessed via a synchronous API.
//
// In the next section, you'll be accessing the data from Firebase.
// This is a asynchronous API which means we'll have to wait for the data.
// It would be a bad idea to wait for the data before creating the store and rendering the React app.
// The bulk add option makes that scenario much easier to manage. You simply bulk add the todos whenever firebase responds.
var initialTodos = TodoAPI.getTodos();
var store = configureStore.configure({todos: initialTodos});

store.subscribe(function() {
  var state = store.getState();
  TodoAPI.setTodos(state.todos);
  // console.log('Updated state', state);
});

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
