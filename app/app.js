const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const TodoApp = require('TodoApp').default;
const TodoAPI = require('TodoAPI');

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(function() {
  var state = store.getState();
  console.log('Updated state', state);
  TodoAPI.setTodos(state.todos);
});

// store.dispatch(actions.addTodo('Clean the yard'));
// store.dispatch(actions.setSearchText('yard'));
// store.dispatch(actions.toggleShowCompleted());

require('style!css!sass!appSass');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
