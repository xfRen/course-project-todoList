const React = require('react');
const {connect} = require('react-redux');
// ES 6 syntax:
// import Todo from 'Todo';
// ES 5 syntax:
var Todo = require('Todo').default;

// We're able to export the connected component by default,
// and we can still export the unconnected component for testing purposes.
// the below named export will not be used anywhere but test files
export var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired
  },
  render: function() {
    var {todos} = this.props;
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

// ES 5
// module.exports = connect(
//   function(state) {
//     return {
//       todos: state.todos
//     };
//   }
// )(TodoList);

// ES6
export default connect(
  (state) => {
    return {
      todos: state.todos
    };
  }
)(TodoList);
