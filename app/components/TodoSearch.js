const React = require('react');

var TodoSearch = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div>
        <div>
          <input type='search' ref='searchText'
            placeholder='Search todos' onChange={this.handleSearch}/>
        </div>
        <div>
          <label>
            <input type='checkbox' ref='showCompleted' onChange={this.handleSearch}/>
            Show completed todos
          </label>
        </div>
      </div>
    );
  },
  handleSearch: function() {
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;
    this.props.onSearch(showCompleted, searchText);
  }
});

module.exports = TodoSearch;
