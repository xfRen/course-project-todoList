const expect = require('expect');
const df = require('deep-freeze-strict');
const reducers = require('reducers');

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
});
