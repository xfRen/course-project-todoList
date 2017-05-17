const React = require('react');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const TodoApp = require('TodoApp');

describe('Component - TodoApp', function() {
  it('should exist', function() {
    expect(TodoApp).toExist();
  });

  it('should add todo to the todos state on handleAddTodo', function() {
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    todoApp.setState({
      todos: []
    });
    var todoText = 'test text';
    todoApp.handleAddTodo(todoText);
    expect(todoApp.state.todos.length).toBe(1);
    expect(todoApp.state.todos[0].text).toBe(todoText);
  });
});
