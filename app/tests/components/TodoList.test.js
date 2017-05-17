const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const uuid = require('uuid');
const TodoList = require('TodoList');
const Todo = require('Todo');

describe('Component - TodoList', function() {
  it('should exist', function() {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each todo item', function() {
    var todos = [{
      id: uuid(),
      text: 'Walk the dog'
    }, {
      id: uuid(),
      text: 'Clean the yard'
    }];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
    expect(todoComponents.length).toBe(todos.length);
  });
});
