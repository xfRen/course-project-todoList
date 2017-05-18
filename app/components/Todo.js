const React = require('react');

var Todo = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired
  },
  render: function() {
    var {id, text, completed} = this.props;
    return (
      <div onClick={() => {
          this.props.onToggle(id);
        }}>
        <input type='checkbox' checked={completed} onChange={() => {}}/>
        {text}
      </div>
    );
  }
});

module.exports = Todo;
