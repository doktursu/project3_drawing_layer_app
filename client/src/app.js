var App = require('./components/App.jsx');

var ObjectController = require('./components/ObjectController.jsx');
var FabricObjectsExampleData = require('./FabricObjectsExampleData.js');

var AppExampleData = require('./AppExampleData.js');
var AppWebAPIUtils = require('./utils/AppWebAPIUtils.js');
var React = require('react');
var ReactDOM = require('react-dom');

window.onload = function() {

    AppExampleData.init();
    AppWebAPIUtils.getAllFrames();

    FabricObjectsExampleData.init();
    AppWebAPIUtils.getAllObjects();

    ReactDOM.render(
        <ObjectController />,
        document.querySelector('#react')
    );
}