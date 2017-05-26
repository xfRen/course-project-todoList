const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const uuid = require('uuid');
const moment = require('moment');
// We want to access our named export "Todo".
// This is the Todo component that's not wired up with connect.
// This allows us to test the component by injecting our own props and dispatch spy.
// ES 5 syntax:
// const {Todo} = require('Todo');
// ES 6 syntax:
import {Todo} from 'Todo';

describe('components/Todo', function() {
  it('should exist', function() {
    expect(Todo).toExist();
  });

  it('should dispatch TOGGLE_TODO action on click', function() {
    var id = uuid();
    var todoData = {
      id: id,
      text: 'Test features',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    };
    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);
    var div = ReactDOM.findDOMNode(todo);
    TestUtils.Simulate.click(div);
    expect(spy).toHaveBeenCalledWith({
      type: 'TOGGLE_TODO',
      id: id
    });
  });
});
