var App = require('./components/App.jsx');
var React = require('react');
var ReactDOM = require('react-dom');

window.onload = function() {
    ReactDOM.render(
        <App />,
        document.querySelector('#react')
    );
}