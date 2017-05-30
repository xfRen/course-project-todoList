import expect from 'expect';
import TodoAPI from 'TodoAPI';
import uuid from 'uuid';

describe('api/TodoAPI', () => {
  beforeEach(() => { // Mocha lifecycle method; it gets called before every test
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('Function - setTodos', () => {
    it('should set valid todos array', () => {
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

    it('should not set invalid todos array', () => {
      var badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);
      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('Function - getTodos', () => {
    it('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', () => {
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
});
