// var FabricCanvas = require('./FabricCanvas.jsx');
// var DrawingModeOptions = require('./DrawingModeOptions.jsx');
var AppObjectActionCreators = require('../actions/AppObjectActionCreators');
var LayerStore = require('../stores/LayerStore');

var LayerSection = require('./LayerSection.jsx');
var FrameSelector = require('./FrameSelector.jsx');

var AnimationStore = require('../stores/AnimationStore');
// var JsonObjectStore = require('../stores/JsonObjectStore.js');
var ObjectStore = require('../stores/ObjectStore');
var React = require('react');

var canvas;

function getStateFromStore() {
    return {
        objects: ObjectStore.getAllOrdered()
    }
}

function getInitialCanvasJSONFromStore() {
    return {canvasJSON: AnimationStore.getCanvasJSON()};
}

var ObjectController = React.createClass({

    getInitialState: function() {
        console.log('get', getInitialCanvasJSONFromStore());
        return getInitialCanvasJSONFromStore();
    },

    componentDidMount: function() {
        this._initializeFabricCanvas();
        AnimationStore.addChangeListener(this._onChange);
    },

    _initializeFabricCanvas: function() {
        canvas = new fabric.Canvas("c");
        canvas.isDrawingMode = true;
        canvas.selectable = true;


        // var json = {};
        // json["objects"] = this.state.objects;
        // json["background"] = "rgba(0, 0, 0, 0)";
        // var json = JSON.stringify(json);

        console.log('json', this.state.canvasJSON);

        canvas.loadFromJSON(this.state.canvasJSON);

        // this.state.objects.forEach(function(object) {
        //     canvas.add(object);
        // });

        canvas.on('object:added', function() {
            var objects = canvas.getObjects();
            var object = objects[objects.length - 1];
            object.moveTo(LayerStore.getCurrentInsertionIndex());
            this._onCreate(object);
        }.bind(this));

        // console.log(json);
        console.log('canvas', JSON.stringify(canvas));
        this._sendCanvas(canvas);
    },

    componentDidUpdate: function() {
        console.log('rerender canvas', canvas);
        // canvas._objects = this.state.objects;
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
        AnimationStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <LayerSection />
                <h1>Objects</h1>
                <canvas id="c" width={300} height={300} />
                <button onClick={this._onDrawingModeClick}>Drawing Mode</button>
                <FrameSelector frames={[{id:1},{id:2},{id:3}]} />
            </div>
        );
    },

    _onChange: function() {
        console.log('----------CANVAS CHANGED----------');
        // this.setState(getStateFromStore());
    },

    _onCreate: function(object) {
        AppObjectActionCreators.createObject(object, LayerStore.getCurrentID());
    },

    _onDrawingModeClick: function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
    },

    _sendCanvas: function(canvas) {
        AppObjectActionCreators.sendCanvas(canvas);
    }
});

module.exports = ObjectController;