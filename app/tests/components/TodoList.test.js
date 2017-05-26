const React = require('react');
const {Provider} = require('react-redux');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const uuid = require('uuid');
const moment = require('moment');
import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('components/TodoList', function() {
  it('should exist', function() {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each todo item', function() {
    var todos = [{
      id: uuid(),
      text: 'Walk the dog',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    }, {
      id: uuid(),
      text: 'Clean the yard',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    }];
    var store = configure({
      showCompleted: false,
      searchText: '',
      todos: todos
    });
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );
    var todoList = TestUtils.findRenderedComponentWithType(provider, ConnectedTodoList);
    var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);
    expect(todoComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos', function() {
    // var todos = [];
    var state = {
      showCompleted: false,
      searchText: '',
      todos: []
    };
    var todoList = TestUtils.renderIntoDocument(<TodoList {...state}/>);
    var todoComponents = TestUtils.findRenderedDOMComponentWithClass(todoList, 'container__message');
    expect(todoComponents).toExist();
  });
});
