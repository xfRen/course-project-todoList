import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import firebase from 'configureFirebase';

import TodoApp from 'TodoApp';
import Login from 'Login';

// react router middleware
// nextState, replace, next are arguments that our onEnter callbacks get called with. They come from react-router.
var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
};

export default (
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
    </Route>
  </Router>
);
