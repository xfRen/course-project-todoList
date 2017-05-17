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
      return todos.map((todo, index) => {
        return (
          <Todo key={index} {...todo}/>
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
