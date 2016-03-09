// var FabricCanvas = require('./FabricCanvas.jsx');
var AppObjectActionCreators = require('../actions/AppObjectActionCreators');
var AppAssetActionCreators = require('../actions/AppAssetActionCreators');

var DrawingModeOptions = require('./DrawingModeOptions.jsx');
// var LayerSection = require('./LayerSection.jsx');
// var FrameSelector = require('./FrameSelector.jsx');
var AppWebAPIUtils = require('../utils/AppWebAPIUtils');

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
                <button
                    onClick={this._onSaveAsset}>
                    Save as Asset
                </button>
                <canvas 
                    id="c"
                    width={300}
                    height={300}
                    onKeyDown={this._onKeyDown} />
                <DrawingModeOptions canvas={canvas} />
                <button
                    onClick={this._exportGIF}>
                    Export to GIF
                </button>
            </div>
        );
    },

    _onChange: function() {
        console.log('----------CANVAS CHANGED----------');
        console.log(getStateFromStore());
        this.setState(getStateFromStore());
    },

    _onBlur: function() {
        canvas.deactivateAll();
    },

    _onCreate: function(object) {
        AppObjectActionCreators.createObject(object, AnimationStore.getCurrentID(), LayerStore.getCurrentID(), FrameStore.getCurrentID());
    },

    _onDelete: function() {
        var object = canvas.getActiveObject();
        if (object) {
            AppObjectActionCreators.destroyObject(object.id);
        }
        var group = canvas.getActiveGroup();
        if (group) {
            group.forEachObject(function(o) {
                AppObjectActionCreators.destroyObject(o.id);
            });
            canvas.discardActiveGroup();
            this._onChange();
        }
    },

    _onSaveAsset: function() {
        var object = canvas.getActiveObject();
        if (object) {
            console.log('ASSET OBJ', JSON.stringify(object));
            canvas.deactivateAll();
            var clone = fabric.util.object.clone(object);
            // AppAssetActionCreators.saveAsset([clone]);
            AppWebAPIUtils.createAsset([clone]);
        }
        var group = canvas.getActiveGroup();
        if (group) {
            console.log('ASSET GROUP', group._objects);
            canvas.deactivateAll();
            var clones = [];
            group.forEachObject(function(o) {
                clones.unshift(fabric.util.object.clone(o));
            });
            // AppAssetActionCreators.saveAsset(clones);
            AppWebAPIUtils.createAsset(clones);
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
    },

    _exportGIF: function() {
        // var gif = new GIF({
        //     workers: 2,
        //     quality: 10
        // });

        // gif.addFrame(imageElement);
        // gif.addFrame(canvasElement, {delay: 200});

        // gif.on('finished', function(blob) {
        //     window.open(URL.createObjectURL(blob));
        // });

        // gif.render();

        // set 
        // var gif = new GIF({
        //     workers: 2,
        //     quality: 10
        // });

        // var frameOrder = FrameStore.getOrder();
        // frameOrder.forEach(function(frameID) {
        //     var objects = ObjectStore.getAllForFrame(frameID);
        //     canvas._objects = objects;
        //     var img = canvas.toDataURL('png')
        //      window.open(img);
        // });

        //////

        var encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(500);
        encoder.start();
        var frameOrder = FrameStore.getOrder();
        frameOrder.forEach(function(frameID) {
            var objects = ObjectStore.getAllForFrame(frameID);
            canvas._objects = objects;
            var img = canvas.toDataURL({format:'jpeg'});
            // var imgdata = img.getImageData();
            console.log('got here');
            encoder.addFrame(img);
        });
        encoder.finish();
        console.log('and got here');
        var binary_gif = encoder.stream().getData();
        var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
        window.open(data_url);


        ///////

        //  gif.on('finished', function(blob) {
        //     window.open(gif);
        //  });

        //  gif.render();

        // var img = canvas.toDataURL('png');
        // window.open(img);
    }
});

module.exports = ObjectController;