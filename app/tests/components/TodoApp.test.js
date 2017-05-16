const React = require('react');
const expect = require('expect');
const TodoApp = require('TodoApp');

describe('Component - TodoApp', function() {
  it('should exist', function() {
    expect(TodoApp).toExist();
  });
});
