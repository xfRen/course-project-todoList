import React from 'react';
import {connect} from 'react-redux';
// ES 6 syntax:
// import TodoList from 'TodoList';
// ES 5 syntax
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import {logout} from 'actions';

export var TodoApp = React.createClass({
  render() {
    return (
      <div>
        <div className='page-actions'>
          <button className='hollow button' onClick={this.onLogout}>Logout</button>
        </div>
        <h1 className='page-title'>Todo App</h1>
        <div className='row'>
          <div className='column small-centered small-11 medium-6 large-5'>
            <div className='container'>
              <TodoSearch/>
              <TodoList/>
              <AddTodo/>
            </div>
          </div>
        </div>
      </div>
    );
  },
  onLogout() {
    var {dispatch} = this.props;
    dispatch(logout());
  }
});

export default connect()(TodoApp);
