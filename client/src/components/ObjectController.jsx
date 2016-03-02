// var FabricCanvas = require('./FabricCanvas.jsx');
// var DrawingModeOptions = require('./DrawingModeOptions.jsx');
var AppObjectActionCreators = require('../actions/AppObjectActionCreators.js');
var LayerStore = require('../stores/LayerStore.js');

var LayerSection = require('./LayerSection.jsx');
var FrameSelector = require('./FrameSelector.jsx');


var ObjectStore = require('../stores/ObjectStore.js');
var React = require('react');

var canvas;

function getStateFromStore() {
    return {
        objects: ObjectStore.getAllOrdered()
    }
}

var ObjectController = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
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

        // canvas.loadFromJSON(json);

        // with objects
        // var object = new fabric.Rect(this.state.objects[1]);
        // console.log(object);
        // canvas.add(object);
        // canvas.render();


        this.state.objects.forEach(function(object) {
            canvas.add(object);
        });

        canvas.on('object:added', function() {
            var objects = canvas.getObjects();
            var object = objects[objects.length - 1];
            object.moveTo(LayerStore.getCurrentInsertionIndex());
            console.log('added', object);
            this._onCreate(object);
        }.bind(this));

        // console.log(json);
        console.log(canvas);
    },

    componentDidUpdate: function() {
        console.log('rerender canvas', canvas);
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
        this.setState(getStateFromStore());
    },

    _onCreate: function(object) {
        AppObjectActionCreators.createObject(object, LayerStore.getCurrentID());
    },

    _onDrawingModeClick: function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
    }
});

module.exports = ObjectController;