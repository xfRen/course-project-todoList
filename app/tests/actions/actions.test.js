import expect from 'expect';
import uuid from 'uuid';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from 'actions';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
// this is a generator that we can use to generate as many distinct mock stores as we like
var createMockStore = configureMockStore(middlewares);

describe('actions/actions', function() {
  it('should generate search text action', function() {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var response = actions.setSearchText(action.searchText);
    expect(response).toEqual(action);
  });

  it('should generate add todo action', function() {
    var todo = {
      id: uuid(),
      text: 'Thing to do',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    };
    var action = {
      type: 'ADD_TODO',
      todo: todo
    };
    var response = actions.addTodo(todo);
    expect(response).toEqual(action);
  });

  it('should generate toggle showCompleted action', function() {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var response = actions.toggleShowCompleted();
    expect(response).toEqual(action);
  });

  it('should generate toggle todo action', function() {
    var action = {
      type: 'TOGGLE_TODO',
      id: uuid()
    };
    var response = actions.toggleTodo(action.id);
    expect(response).toEqual(action);
  });

// Question: Why we need to create a fake store using redux-mock-store, instead of using real store to test the action?
// Answer: The utility function 'store.getActions()' makes it easy to check what actions were dispatched.
  it('should create todo and dispatch ADD_TODO', function(done) {
    // create an instance of mock store
    const store = createMockStore({});
    const todoText = 'My todo item';
    store.dispatch(actions.callAddTodo(todoText)).then(function() {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });
});
