const React = require('react');
const uuid = require('uuid');
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: TodoAPI.getTodos(),
      showCompleted: false,
      searchText: ''
    };
  },
  componentDidUpdate: function() {
    TodoAPI.setTodos(this.state.todos);
  },
  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div>
        <TodoSearch onSearch={this.handleSearch}/>
        <TodoList todos={filterTodos} onToggle={this.handleToggle}/>
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    );
  },
  handleSearch: function(showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleAddTodo: function(text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false
        }
      ]
    });
    // DO NOT call "TodoAPI.setTodos(this.state.todos);" here! Because:
    // The setState method is not actually synchronous.
    // That's why you can't pull the state value off right after setting it.
    // We fix this in the course by using the componentDidUpdate lifecycle method.
    // You can also fix this by passing a callback as the second argument to setState.
    // That callback will fire once the state is set.
  },
  handleToggle: function(id) {
    var updatedTodos = this.state.todos.map(function(todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos
    });
  }
});

module.exports = TodoApp;
