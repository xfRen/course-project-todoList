import React from 'react';
import {connect} from 'react-redux';
// ES 6 syntax:
// import Todo from 'Todo';
// ES 5 syntax:
import Todo from 'Todo';

// We're able to export the connected component by default,
// and we can still export the unconnected component for testing purposes.
// the below named export will not be used anywhere but test files
export var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    showCompleted: React.PropTypes.bool.isRequired,
    searchText: React.PropTypes.string.isRequired
  },
  render: function() {
    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
      if (typeof todos === 'undefined' || todos.length === 0) {
        return (
          <p className='container__message'>Nothing To Do</p>
        );
      }
      var filteredTodos = this.filterTodos(todos, showCompleted, searchText);
      if (filteredTodos === null || filteredTodos.length === 0) {
        return (
          <p className='container__message'>Nothing To Do</p>
        );
      }
      return filteredTodos.map((todo) => {
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
  },
  filterTodos: function(todos, showCompleted, searchText) {
    var filteredTodos = todos;
    // filter by showCompleted
    if (!showCompleted) {
      filteredTodos = filteredTodos.filter(function(todo) {
        return !todo.completed;
      });
    }
    // filter by searchText
    if (typeof searchText === 'string' && searchText.length > 0) {
      filteredTodos = filteredTodos.filter(function(todo) {
        var text = todo.text.toLowerCase();
        if (text.indexOf(searchText) !== -1) {
          return true;
        }
        return false;
      });
    }
    // sort todos with non-completed first
    filteredTodos.sort(function(a, b) {
      if (!a.completed && b.completed) {
        return -1; // -1 means a should come before b
      } else if (a.completed && !b.completed) {
        return 1; // 1 means a should come after b
      } else {
        return 0; // 0 means a is equal to b and no need to re-order
      }
    });
    return filteredTodos;
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
    return state;
  }
)(TodoList);
