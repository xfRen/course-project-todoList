const React = require('react');

var AddTodo = React.createClass({
  propTypes: {
    handleAddTodo: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <form onSubmit={this.onSubmitHandler}>
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
    var newTodoInputRef = this.refs.newTodoInput;
    if (newTodoInputRef.value.length > 0) {
      var text = newTodoInputRef.value;
      this.props.handleAddTodo(text);
      newTodoInputRef.value = '';
    } else {
      this.refs.newTodoInput.focus();
    }
  }
});

module.exports = AddTodo;
