const React = require('react');
const expect = require('expect');
const {Provider} = require('react-redux');
const TestUtils = require('react-addons-test-utils');
const uuid = require('uuid');
const moment = require('moment');
// const configureStore = require('configureStore');
import {configure} from 'configureStore';
const TodoApp = require('TodoApp');
const TodoList = require('TodoList').default;

describe('components/TodoApp', function() {
  it('should exist', function() {
    expect(TodoApp).toExist();
  });

  it('should render TodoList', function() {
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
