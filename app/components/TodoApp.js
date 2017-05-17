const React = require('react');
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [
        {id: 1, text: 'Walk the dog'},
        {id: 2, text: 'Clean the yard'}
      ]
    };
  },
  render: function() {
    var {todos} = this.state;
    return (
      <div>
        <TodoList todos={todos}/>
        <AddTodo handleAddTodo={this.handleAddTodo}/>
      </div>
    );
  },
  handleAddTodo: function(text) {
    alert('new todo: ' + text);
  }
});

module.exports = TodoApp;
