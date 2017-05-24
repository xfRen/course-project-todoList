const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

const TodoApp = require('TodoApp');

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(function() {
  console.log('Updated state', store.getState());
});

store.dispatch(actions.addTodo('Clean the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());

require('style!css!sass!appSass');

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
