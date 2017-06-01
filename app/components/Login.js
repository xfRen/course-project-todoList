import React from 'react';
import * as Redux from 'react-redux';

import {loginWithGithub} from 'actions';

export var Login = React.createClass({
  render() {
    return (
      <div>
        <h1 className='page-title'>Todo List</h1>
        <div className='row'>
          <div className='columns small-centered small-10 medium-6 large-4'>
            <div className='callout callout-auth'>
              <h3>Login</h3>
              <p>Login with Github account below.</p>
              <button className='button' onClick={this.onLogin}>Login with Github</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  onLogin() {
    var {dispatch} = this.props;
    dispatch(loginWithGithub());
  }
});

export default Redux.connect()(Login);
