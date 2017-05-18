const React = require('react');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const uuid = require('uuid');
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

  it('should toggle completed value when handleToggle called', function() {
    var id = uuid();
    var todoData = {
      id: id,
      text: 'Test features',
      completed: false
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    todoApp.setState({
      todos: [todoData]
    });
    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(id);
    expect(todoApp.state.todos[0].completed).toBe(true);
  });
});
