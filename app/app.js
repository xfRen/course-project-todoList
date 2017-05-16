const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

const TodoApp = require('TodoApp');

require('style!css!sass!appSass');

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
