const expect = require('expect');
const TodoAPI = require('TodoAPI');
const uuid = require('uuid');

describe('API - TodoAPI', function() {
  beforeEach(function() { // Mocha lifecycle method; it gets called before every test
    localStorage.removeItem('todos');
  });

  it('should exist', function() {
    expect(TodoAPI).toExist();
  });

  describe('Function - setTodos', function() {
    it('should set valid todos array', function() {
      var todos =[{
        id: uuid(),
        text: 'test all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);
      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      expect(actualTodos).toEqual(todos);
      // for object / arrays, in most cases use toEqual rather than toBe
      // toBe asserts that object is strictly equal to value using ===.
      // toEqual compare the values on them
    });

    it('should not set invalid todos array', function() {
      var badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);
      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('Function - getTodos', function() {
    it('should return empty array for bad localStorage data', function() {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', function() {
      var todos =[{
        id: uuid(),
        text: 'test all files',
        completed: false
      }];
      localStorage.setItem('todos', JSON.stringify(todos)); // don't use setTodos here to make the test focus on getTodos
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });

  describe('Function - filterTodos', function() {
    var todos = [{
      id: uuid(),
      text: 'Some text here',
      completed: true
    }, {
      id: uuid(),
      text: 'Other text here',
      completed: false
    }, {
      id: uuid(),
      text: 'Some text here',
      completed: true
    }];
    it('should return all items if showCompleted is true', function() {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(todos.length);
    });

    it('should return non-completed todos when showCompleted is false', function() {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', function() {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false); // the non-completed item - the second item, should be on the top
    });

    it('should filter todos by searchText', function() {
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'other');
      expect(filteredTodos.length).toBe(1);
    });

    it('should retrun all todos if searchText is empty', function() {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(todos.length);
    });
  });
});
