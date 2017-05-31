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

  describe('Function - getTodos', () => {

  });
});
