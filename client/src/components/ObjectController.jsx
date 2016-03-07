// var FabricCanvas = require('./FabricCanvas.jsx');
var AppObjectActionCreators = require('../actions/AppObjectActionCreators');

var DrawingModeOptions = require('./DrawingModeOptions.jsx');
// var LayerSection = require('./LayerSection.jsx');
// var FrameSelector = require('./FrameSelector.jsx');

var AnimationStore = require('../stores/AnimationStore');
var LayerStore = require('../stores/LayerStore');
var FrameStore = require('../stores/FrameStore');
// var JsonObjectStore = require('../stores/JsonObjectStore.js');
var ObjectStore = require('../stores/ObjectStore');
var React = require('react');

var canvas;
var BACKSPACE_KEY_CODE = 8;

function getStateFromStore() {
    return {
        objects: ObjectStore.getAllForCurrentFrame()
    }
}

function getInitialCanvasJSONFromStore() {
    return {
        canvasJSON: AnimationStore.getCanvasJSON()
    };
}

var ObjectController = React.createClass({

    getInitialState: function() {
        console.log('get', getInitialCanvasJSONFromStore());
        return getInitialCanvasJSONFromStore();
    },

    componentDidMount: function() {
        ObjectStore.addChangeListener(this._onChange);
        this._initializeFabricCanvas();
    },

    _initializeFabricCanvas: function() {
        canvas = new fabric.Canvas("c");
        canvas.isDrawingMode = true;
        canvas.selectable = true;

        // var json = {};
        // json["objects"] = this.state.objects;
        // json["background"] = "rgba(0, 0, 0, 0)";
        // var json = JSON.stringify(json);

        canvas.loadFromJSON(this.state.canvasJSON);

        canvas.on('object:added', function() {
            var objects = canvas.getObjects();
            var object = objects[objects.length - 1];
            this._onCreate(object);
        }.bind(this));

        console.log('canvas', JSON.stringify(canvas));
        this._sendCanvas(canvas);
        this.setState({canvas: canvas});
    },

    componentDidUpdate: function() {
        console.log('rerender canvas', this.state.objects);
        canvas._objects = this.state.objects;
        canvas.renderAll();
    },

    // componentDidUpdate: function() {
    //     canvas.clear();

    //     var json = {};
    //     json["objects"] = this.state.objects;
    //     json["background"] = "rgba(0, 0, 0, 0)";
    //     var json = JSON.stringify(json);

    //     canvas.loadFromJSON(json);
    //     console.log(json);
    //     console.log(canvas);
    // },

    componentWillUnmount: function() {
        ObjectStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <h1>Objects</h1>
                <button
                    onClick={this._onDelete}>
                    Delete Object
                </button>
                <canvas 
                    id="c"
                    width={300}
                    height={300}
                    onKeyDown={this._onKeyDown} />
                <DrawingModeOptions canvas={canvas} />
            </div>
        );
    },

    _onChange: function() {
        console.log('----------CANVAS CHANGED----------');
        console.log(getStateFromStore());
        this.setState(getStateFromStore());
    },

    _onCreate: function(object) {
        AppObjectActionCreators.createObject(object, AnimationStore.getCurrentID(), LayerStore.getCurrentID(), FrameStore.getCurrentID());
    },

    _onDelete: function() {
        var object = canvas.getActiveObject();
        if (object) {
            AppObjectActionCreators.destroyObject(object.id);
        }
    },

    _onKeyDown: function(e) {
        console.log('KEY PRESSED');
        if (e.keyCode === BACKSPACE_KEY_CODE) {
            var object = canvas.getActiveObject();
            console.log('selected', object);
            // AppObjectActionCreators.destroyObject(object);
        }
    },

    _sendCanvas: function(canvas) {
        AppObjectActionCreators.sendCanvas(canvas);
    }
});

module.exports = ObjectController;