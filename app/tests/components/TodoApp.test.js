import React from 'react';
import expect from 'expect';
import {Provider} from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import uuid from 'uuid';
// const configureStore = require('configureStore');
import {configure} from 'configureStore';
import TodoApp from 'TodoApp';
import TodoList from 'TodoList';

describe('components/TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should render TodoList', () => {
    // var store = configureStore.configure();
    var store = configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoApp/>
      </Provider>
    );
    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);
    // Provider is not a DOM element, ReactDOM.findDOMNode(provider); will be TodoApp itself!!!
    // var todoApp = ReactDOM.findDOMNode(provider);
    expect(todoList.length).toBe(1);
  });
});
