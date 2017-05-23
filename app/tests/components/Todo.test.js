const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const uuid = require('uuid');
const moment = require('moment');
const Todo = require('Todo');

describe('components/Todo', function() {
  it('should exist', function() {
    expect(Todo).toExist();
  });

  it('should call onToggle prop with id on click', function() {
    var id = uuid();
    var todoData = {
      id: id,
      text: 'Test features',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    };
    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);
    var div = ReactDOM.findDOMNode(todo);
    TestUtils.Simulate.click(div);
    expect(spy).toHaveBeenCalledWith(id);
  });
});
