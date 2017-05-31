import expect from 'expect';
import uuid from 'uuid';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase, {firebaseRef} from 'configureFirebase';
import * as actions from 'actions';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
// this is a generator that we can use to generate as many distinct mock stores as we like
var createMockStore = configureMockStore(middlewares);

describe('actions/actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var response = actions.setSearchText(action.searchText);
    expect(response).toEqual(action);
  });

  it('should generate add todo action', () => {
    var todo = {
      id: uuid(),
      text: 'Thing to do',
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    };
    var action = {
      type: 'ADD_TODO',
      todo: todo
    };
    var response = actions.addTodo(todo);
    expect(response).toEqual(action);
  });

  it('should generate toggle showCompleted action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var response = actions.toggleShowCompleted();
    expect(response).toEqual(action);
  });

  it('should generate update todo action', () => {
    var updates = {};
    var action = {
      type: 'UPDATE_TODO',
      id: uuid(),
      updates
    };
    var response = actions.updateTodo(action.id, updates);
    expect(response).toEqual(action);
  });

// Question: Why we need to create a fake store using redux-mock-store, instead of using real store to test the action?
// Answer: The utility function 'store.getActions()' makes it easy to check what actions were dispatched.
  it('should create todo and dispatch ADD_TODO', (done) => {
    // create an instance of mock store
    const store = createMockStore({});
    const todoText = 'My todo item';
    const action = actions.callAddTodo(todoText);
    store.dispatch(action).then(() => {
      const mockActions = store.getActions();
      expect(mockActions.length).toBe(1);
      var actualAction = mockActions[0];
      expect(actualAction).toInclude({
        type: 'ADD_TODO'
      });
      expect(actualAction.todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;
    var testTodo = {
      text: 'todo for testing',
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    beforeEach((done) => {
      var todosRef = firebaseRef.child('todos');
      todosRef.remove().then(() => {
        testTodoRef = todosRef.push();
        return testTodoRef.set(testTodo);
      }).then(() => {
        done();
      }).catch(done);
    });

    afterEach((done) => {
      testTodoRef.remove().then(() => {
        done();
      }).catch(done);
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      var id = testTodoRef.key;
      var completed = true;
      var action = actions.callToggleTodo(id, completed);
      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions.length).toBe(1);
        var actualAction = mockActions[0];
        expect(actualAction).toInclude({
          type: 'UPDATE_TODO',
          id
        });
        expect(actualAction.updates).toInclude({
          completed
        });
        expect(actualAction.updates.completedAt).toExist();
        done();
      }).catch(done);
    });

    it('should populate todos and dispatch GET_TODOS', (done) => {
      const store = createMockStore({});
      var action = actions.fetchTodos();
      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions.length).toBe(1);
        var actualAction = mockActions[0];
        expect(actualAction).toInclude({
          type: 'GET_TODOS'
        });
        var todos = actualAction.todos;
        expect(todos.length).toBe(1);
        expect(todos[0]).toInclude({
          text: 'todo for testing'
        });
        done();
      }).catch(done);
    });
  });
});
