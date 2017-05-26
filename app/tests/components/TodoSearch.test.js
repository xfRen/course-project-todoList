const React = require('react');
const expect = require('expect');
const TestUtils = require('react-addons-test-utils');
const {TodoSearch} = require('TodoSearch');

describe('components/TodoSearch', function() {
  it('should exist', function() {
    expect(TodoSearch).toExist();
  });

  it('should dispatch a setSearchText action with entered input text', function() {
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    var searchText = 'dog';
    todoSearch.refs.searchText.value = searchText;
    TestUtils.Simulate.change(todoSearch.refs.searchText);
    expect(spy).toHaveBeenCalledWith({
      type: 'SET_SEARCH_TEXT',
      searchText: searchText
    });
  });

  it('should toggle showCompleted', function() {
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    TestUtils.Simulate.change(todoSearch.refs.showCompleted);
    // Question: For the showCompleted test I tried to use TestUtils.Simulate.click(todoSearch.refs.showCompleted);
    // But that didn't seem to cause a onChange event?

    // Answer: The TestUtils library is picky when it comes to simulating events that would trigger other events.
    // In our case, clicking should indeed trigger an onChange event, but it wont.
    // A simulated click will only trigger an onClick handler.
    // This means we will need to use TestUtils.Simulate.change to get this test case to work.
    expect(spy).toHaveBeenCalledWith({
      type: 'TOGGLE_SHOW_COMPLETED'
    });
  });
});
