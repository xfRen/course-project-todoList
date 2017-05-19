const React = require('react');
const Todo = require('Todo');

var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    onToggle: React.PropTypes.func.isRequired
  },
  render: function() {
    var {todos} = this.props;
    var {onToggle} = this.props;
    var renderTodos = function() {
      if (typeof todos === 'undefined') {
        return null;
      }
      if (todos.length === 0) {
        return (
          <p className='container__message'>Nothing To Do</p>
        );
      }
      return todos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo} onToggle={onToggle}/>
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
