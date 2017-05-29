import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export var TodoSearch = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className='container__header'>
        <div>
          <input type='search' ref='searchText'
            placeholder='Search todos' onChange={this.handleSearchTextChange}/>
        </div>
        <div>
          <label>
            <input type='checkbox' ref='showCompleted' onChange={this.handleCheckBoxChange}/>
            Show completed todos
          </label>
        </div>
      </div>
    );
  },
  handleSearchTextChange: function() {
    var searchText = this.refs.searchText.value;
    var {dispatch} = this.props;
    dispatch(actions.setSearchText(searchText));
  },
  handleCheckBoxChange: function() {
    var {dispatch} = this.props;
    dispatch(actions.toggleShowCompleted());
  }
});

export default connect()(TodoSearch);
