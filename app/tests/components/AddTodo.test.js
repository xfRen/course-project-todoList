import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import * as actions from 'actions';
import {AddTodo} from 'AddTodo';

describe('components/AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch an action with valid data', () => {
    const text = 'Check mail';
    const action = actions.callAddTodo(text);
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    addTodo.refs.newTodoInput.value = text;
    TestUtils.Simulate.submit(addTodo.refs.form);
    // This is also working:
    // var form = ReactDOM.findDOMNode(addTodo);
    // if ref is not available, use ReactDOM.findDOMNode()

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch an action when invalid input', () => {
    const text = '';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    addTodo.refs.newTodoInput.value = text;
    var form = ReactDOM.findDOMNode(addTodo);
    TestUtils.Simulate.submit(form);

    expect(spy).toNotHaveBeenCalled();
  });
});
