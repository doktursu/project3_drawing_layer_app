var App = require('./components/App.jsx');
var AppExampleData = require('./AppExampleData.js');
var AppWebAPIUtils = require('./utils/AppWebAPIUtils.js');
var React = require('react');
var ReactDOM = require('react-dom');

window.onload = function() {

    AppExampleData.init();
    AppWebAPIUtils.getAllFrames();

    ReactDOM.render(
        <App />,
        document.querySelector('#react')
    );
}