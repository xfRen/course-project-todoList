import * as redux from 'redux'; // redux doesn't have a default import
import thunk from 'redux-thunk';
import {searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';

export var configure = function(initialState = {}) {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer
  });
  // middleware thunk teaches redux how to work with actions that are NOT objects.
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
