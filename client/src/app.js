var App = require('./components/App.jsx');

var ObjectController = require('./components/ObjectController.jsx');
var FabricObjectsExampleData = require('./FabricObjectsExampleData.js');

var AppExampleData = require('./AppExampleData.js');
var AppWebAPIUtils = require('./utils/AppWebAPIUtils.js');
var React = require('react');
var ReactDOM = require('react-dom');

window.onload = function() {

    // add custom attribute to fabric object
    fabric.Object.prototype.toObject = (function (toObject) {
        return function () {
            return fabric.util.object.extend(toObject.call(this), {
                id: this.id,
                animationId: this.animationId,
                layerIndex: this.layerIndex,
                frameIndex: this.frameIndex,
                layerLock: this.layerLock,
                layerVisible: this.layerVisible
            });
        };
    })(fabric.Object.prototype.toObject);

    AppExampleData.init();
    AppWebAPIUtils.getAllFrames();

    FabricObjectsExampleData.init();
    AppWebAPIUtils.getAllObjects();

    ReactDOM.render(
        <ObjectController />,
        document.querySelector('#react')
    );
}