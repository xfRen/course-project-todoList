const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Remove the below code and load Foundation via scss-loader and styles/base/foundation-settings
// This way we can change the Foundation scss directly and globaly, instead of overwriting the properties with css
// require('style!css!foundation-sites/dist/css/foundation.min.css');
require('style!css!sass!appSass');

ReactDOM.render(
  <p>Boilerplate v3.0</p>,
  document.getElementById('app')
);
