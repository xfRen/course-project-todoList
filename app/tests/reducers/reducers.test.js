import expect from 'expect';
import df from 'deep-freeze-strict';
import uuid from 'uuid';
import moment from 'moment';
import * as reducers from 'reducers';

describe('reducers/reducers', function() {
  describe('searchTextReducer', function() {
    it('should set searchText', function() {
      var searchText = 'cat';
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: searchText
      };
      var response = reducers.searchTextReducer(df(''), df(action)); // if anything in df() is updated, the test will fail
      expect(response).toBe(searchText);
    });
  });

  describe('searchTextReducer', function() {
    it('should toggle showCompleted', function() {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var response = reducers.showCompletedReducer(df(false), df(action));
      expect(response).toBe(true);
    });
  });

  describe('todosReducer', function() {
    it('should add new todo', function() {
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

    it('should toggle todo', function() {
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
      var action = {
        type: 'TOGGLE_TODO',
        id: id
      };
      var response = reducers.todosReducer(df(todos), df(action));
      expect(response[0].completed).toBe(true);
      expect(response[0].completedAt).toNotBe(undefined);
    });
  });
});
