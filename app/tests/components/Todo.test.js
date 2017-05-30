import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import uuid from 'uuid';
import moment from 'moment';
// We want to access our named export "Todo".
// This is the Todo component that's not wired up with connect.
// This allows us to test the component by injecting our own props and dispatch spy.
// ES 5 syntax:
// const {Todo} = require('Todo');
// ES 6 syntax:
import {Todo} from 'Todo';
import * as actions from 'actions';

describe('components/Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should dispatch callToggleTodo action on click', () => {
    var id = uuid();
    var completed = false;
    var todoData = {
      id: id,
      text: 'Test features',
      completed,
      createdAt: moment().unix(),
      completedAt: undefined
    };
    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);
    var div = ReactDOM.findDOMNode(todo);
    TestUtils.Simulate.click(div);
    var expectedAction = actions.callToggleTodo(id, !completed);
    expect(spy).toHaveBeenCalledWith(expectedAction);
  });
});
