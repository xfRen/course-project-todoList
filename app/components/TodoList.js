const React = require('react');
const Todo = require('Todo');

var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired
  },
  render: function() {
    var {todos} = this.props;
    var renderTodos = function() {
      if (typeof todos === 'undefined') {
        return null;
      }
      return todos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
    };
    return (
      <div>
        {renderTodos()}
      </div>
    );
  }
});

module.exports = TodoList;
