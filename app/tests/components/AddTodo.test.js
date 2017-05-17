const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const AddTodo = require('AddTodo');

describe('Component - AddTodo', function() {
  it('should exist', function() {
    expect(AddTodo).toExist();
  });

  it('should call handleAddTodo prop with valid data', function() {
    const text = 'Check mail';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo handleAddTodo={spy}/>);
    addTodo.refs.newTodoInput.value = text;
    var form = ReactDOM.findDOMNode(addTodo);
    TestUtils.Simulate.submit(form);

    expect(spy).toHaveBeenCalledWith(text);
  });

  it('should not call handleAddTodo prop when invalid input', function() {
    const text = '';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo handleAddTodo={spy}/>);
    addTodo.refs.newTodoInput.value = text;
    var form = ReactDOM.findDOMNode(addTodo);
    TestUtils.Simulate.submit(form);

    expect(spy).toNotHaveBeenCalled();
  });
});
