const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const AddTodo = require('AddTodo').AddTodo;

describe('components/AddTodo', function() {
  it('should exist', function() {
    expect(AddTodo).toExist();
  });

  it('should dispatch an ADD_TODO action with valid data', function() {
    const text = 'Check mail';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    addTodo.refs.newTodoInput.value = text;
    TestUtils.Simulate.submit(addTodo.refs.form);
    // This is also working:
    // var form = ReactDOM.findDOMNode(addTodo);
    // if ref is not available, use ReactDOM.findDOMNode()

    expect(spy).toHaveBeenCalledWith({
      type: 'ADD_TODO',
      text
    });
  });

  it('should not dispatch an action when invalid input', function() {
    const text = '';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    addTodo.refs.newTodoInput.value = text;
    var form = ReactDOM.findDOMNode(addTodo);
    TestUtils.Simulate.submit(form);

    expect(spy).toNotHaveBeenCalled();
  });
});
