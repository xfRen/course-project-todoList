const React = require('react');
const uuid = require('uuid');
const moment = require('moment');
const {connect} = require('react-redux');
// ES 6 syntax:
// import TodoList from 'TodoList';
// ES 5 syntax
var TodoList = require('TodoList').default;
const AddTodo = require('AddTodo').default;
const TodoSearch = require('TodoSearch').default;

var TodoApp = React.createClass({
  render: function() {
    return (
      <div>
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
  }
});

export default connect()(TodoApp);
