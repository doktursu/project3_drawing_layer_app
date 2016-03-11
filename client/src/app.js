var ObjectController = require('./components/ObjectController.jsx');
var AnimationController = require('./components/AnimationController.jsx');

var FabricObjectsExampleData = require('./FabricObjectsExampleData.js');

var RawAnimationData = require('./RawAnimationData');

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
                layerID: this.layerIndex,
                frameIndex: this.frameIndex,
                layerLock: this.layerLock,
                layerVisible: this.layerVisible
            });
        };
    })(fabric.Object.prototype.toObject);

    // http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
    // Prevent the backspace key from navigating back.
    document.removeEventListener('keydown');
    document.addEventListener('keydown', function (event) {
        var doPrevent = false;
        if (event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' && 
                 (
                     d.type.toUpperCase() === 'TEXT' ||
                     d.type.toUpperCase() === 'PASSWORD' || 
                     d.type.toUpperCase() === 'FILE' || 
                     d.type.toUpperCase() === 'SEARCH' || 
                     d.type.toUpperCase() === 'EMAIL' || 
                     d.type.toUpperCase() === 'NUMBER' || 
                     d.type.toUpperCase() === 'DATE' )
                 ) || 
                 d.tagName.toUpperCase() === 'TEXTAREA') {
                doPrevent = d.readOnly || d.disabled;
            }
            else {
                doPrevent = true;
            }
        }

        if (doPrevent) {
            event.preventDefault();
        }
    });

    // AppExampleData.init();
    // RawAnimationData.init();
    // AppWebAPIUtils.getRawAnimation();


    // AppWebAPIUtils.getAnimation(31);
    AppWebAPIUtils.createAnimation();
    AppWebAPIUtils.getAllAssets();


    // AppWebAPIUtils.getAllFrames();

    // FabricObjectsExampleData.init();
    // AppWebAPIUtils.getAllObjects();

    ReactDOM.render(
        <AnimationController />,
        document.querySelector('#react')
    );
}