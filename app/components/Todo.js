const React = require('react');

var Todo = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    text: React.PropTypes.string.isRequired
  },
  render: function() {
    var {id, text} = this.props;
    return (
      <div>
        {id}. {text}
      </div>
    );
  }
});

module.exports = Todo;
