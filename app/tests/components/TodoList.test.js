import React from 'react';
import {Provider} from 'react-redux';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import uuid from 'uuid';
import moment from 'moment';
import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('components/TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each todo item', () => {
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

  it('should render empty message if no todos', () => {
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

  describe('Function - filterTodos', () => {
    var todos = [{
      id: uuid(),
      text: 'Some text here',
      completed: true,
      createdAt: moment().unix(),
      completedAt: moment().unix() + 100
    }, {
      id: uuid(),
      text: 'Other text here',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    }, {
      id: uuid(),
      text: 'Some text here',
      completed: true,
      createdAt: moment().unix(),
      completedAt: moment().unix() + 100
    }];
    var state = {
      showCompleted: false,
      searchText: '',
      todos: []
    };
    it('should return all items if showCompleted is true', () => {
      var todoList = TestUtils.renderIntoDocument(<TodoList {...state}/>);
      var filteredTodos = todoList.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(todos.length);
    });

    it('should return non-completed todos when showCompleted is false', () => {
      var todoList = TestUtils.renderIntoDocument(<TodoList {...state}/>);
      var filteredTodos = todoList.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var todoList = TestUtils.renderIntoDocument(<TodoList {...state}/>);
      var filteredTodos = todoList.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false); // the non-completed item - the second item, should be on the top
    });

    it('should filter todos by searchText', () => {
      var todoList = TestUtils.renderIntoDocument(<TodoList {...state}/>);
      var filteredTodos = todoList.filterTodos(todos, true, 'other');
      expect(filteredTodos.length).toBe(1);
    });

    it('should retrun all todos if searchText is empty', () => {
      var todoList = TestUtils.renderIntoDocument(<TodoList {...state}/>);
      var filteredTodos = todoList.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(todos.length);
    });
  });
});
