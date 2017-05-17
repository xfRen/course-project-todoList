const React = require('react');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const TodoSearch = require('TodoSearch');

describe('Component - TodoSearch', function() {
  it('should exist', function() {
    expect(TodoSearch).toExist();
  });

  it('should call onSearch with entered input text', function() {
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
    var enter = 'dog';
    todoSearch.refs.searchText.value = enter;
    TestUtils.Simulate.change(todoSearch.refs.searchText);
    expect(spy).toHaveBeenCalledWith(false, enter);
  });

  it('should call onSearch with proper checked value', function() {
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
    todoSearch.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(todoSearch.refs.showCompleted);
    expect(spy).toHaveBeenCalledWith(true, '');
  });
});
