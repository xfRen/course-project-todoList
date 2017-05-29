import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';
// the below named export will not be used anywhere but test files
export var Todo = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired,
    createdAt: React.PropTypes.number.isRequired,
    completedAt: React.PropTypes.number,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    // connect give component access to dispatch function, which is indeed a real prop.
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = function() {
      var message = 'Created ';
      var timestamp = createdAt;
      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }
      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    };
    return (
      <div className={todoClassName} onClick={() => {
          dispatch(actions.toggleTodo(id));
        }}>
        <div>
          <input type='checkbox' checked={completed} onChange={() => {}}/>
        </div>
        <div>
          <p>{text}</p>
          <p className='todo__subtext'>{renderDate()}</p>
        </div>
      </div>
    );
  }
});
// TodoList component needs data from the Store.
// So we pass the data there as part of the state (first brackets after connect).
// Todo component doesn't need data from the Store directly (data is passed through TodoList).
// But it needs access to Store method dispatch(action) to be able to send information about toggling checkbox.
// That's why we need to connect Todo component as well.
// We do it with connect function, but first brackets are empty.

// You would "connect" a component if you need either data or the dispatch function.
// We only need dispatch in Todo.
// There is no need to define a function if we don't need data from the store.
export default connect()(Todo);
// module.exports = connect()(Todo);
