const expect = require('expect');
const actions = require('actions');
const uuid = require('uuid');

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
    var action = {
      type: 'ADD_TODO',
      text: 'Thing to do'
    };
    var response = actions.addTodo(action.text);
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
});
