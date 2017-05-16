const React = require('react');
const Todo = require('Todo');

var TodoList = React.createClass({

  render: function() {
    var {todos} = this.props;
    var renderTodos = todos.map((todo, index) => {
      return (
        <Todo key={index} {...todo}/>
      );
    });
    return (
      <div>
        {renderTodos}
      </div>
    );
  }
});

module.exports = TodoList;
