const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var AddTodo = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <form onSubmit={this.onSubmitHandler} ref='form' className='container__footer'>
        <div>
          <input type="text" ref="newTodoInput" placeholder="What do you need to do?"/>
        </div>
        <div>
          <input type="submit" className="button expanded" value="Add Todo"/>
        </div>
      </form>
    );
  },
  onSubmitHandler: function(event) {
    event.preventDefault();
    var {dispatch} = this.props;
    var newTodoInputRef = this.refs.newTodoInput;
    if (newTodoInputRef.value.length > 0) {
      var text = newTodoInputRef.value;
      dispatch(actions.addTodo(text));
      newTodoInputRef.value = '';
    } else {
      this.refs.newTodoInput.focus();
    }
  }
});

// module.exports = AddTodo;
export default connect()(AddTodo);
