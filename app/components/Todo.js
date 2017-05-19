const React = require('react');
const moment = require('moment');

var Todo = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired,
    createdAt: React.PropTypes.number.isRequired,
    completedAt: React.PropTypes.number,
    onToggle: React.PropTypes.func.isRequired
  },
  render: function() {
    var {id, text, completed, createdAt, completedAt} = this.props;
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
      <div onClick={() => {
          this.props.onToggle(id);
        }}>
        <input type='checkbox' checked={completed} onChange={() => {}}/>
        <p>{text}</p>
        <p>{renderDate()}</p>
      </div>
    );
  }
});

module.exports = Todo;
