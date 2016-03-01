// var FabricCanvas = require('./FabricCanvas.jsx');
// var DrawingModeOptions = require('./DrawingModeOptions.jsx');
var LayerSection = require('../components/LayerSection.jsx');


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

        // console.log(json);
        console.log(canvas);
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
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    }
});

module.exports = ObjectController;