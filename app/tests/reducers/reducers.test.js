import expect from 'expect';
import df from 'deep-freeze-strict';
import uuid from 'uuid';
import moment from 'moment';
import * as reducers from 'reducers';

describe('reducers/reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var searchText = 'cat';
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: searchText
      };
      var response = reducers.searchTextReducer(df(''), df(action)); // if anything in df() is updated, the test will fail
      expect(response).toBe(searchText);
    });
  });

  describe('searchTextReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var response = reducers.showCompletedReducer(df(false), df(action));
      expect(response).toBe(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: uuid(),
          text: 'Feed QiuQiu',
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      };
      var response = reducers.todosReducer(df([]), df(action));
      expect(response.length).toBe(1);
      expect(response[0]).toEqual(action.todo);
    });

    it('should update todo', () => {
      var id = uuid();
      var todos = [
        {
          id: id,
          text: 'Feed QiuQiu',
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];
      var updates = {
        completed: true,
        completedAt: moment().unix()
      };
      var action = {
        type: 'UPDATE_TODO',
        id,
        updates
      };
      var response = reducers.todosReducer(df(todos), df(action));
      expect(response[0]).toInclude(updates);
      expect(response[0].text).toBe(todos[0].text);
    });
  });

  describe('authReducer', () => {
    it('should store uid on LOGIN', () => {
      var uid = 'someuid';
      var action = {
        type: 'LOGIN',
        uid
      };
      var response = reducers.authReducer(undefined, df(action));
      expect(response.uid).toBe(uid);
    });

    it('should wipe auth on LOGOUT', () => {
      var auth = {
        uid: 'someuid'
      };
      var action = {
        type: 'LOGOUT',
      };
      var response = reducers.authReducer(df(auth), df(action));
      expect(response).toEqual({});
    });
  });
});
