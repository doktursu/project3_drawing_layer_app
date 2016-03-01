var FabricCanvas = require('./FabricCanvas.jsx');
var DrawingModeOptions = require('./DrawingModeOptions.jsx');

var LayerSection = require('../components/LayerSection.jsx');

var FrameStore = require('../stores/FrameStore.js');
var React = require('react');

function getStateFromStore() {
    return {
        frames: FrameStore.getAllOrdered(),
        canvases: {}
    }
}

var App = React.createClass({

    getInitialState: function() {
        return {
            frames: FrameStore.getAllOrdered(),
            canvases: {}
        }
    },

    componentDidMount: function() {

        var nextCanvases = this.state.frames.reduce((canvases, frame) => {
            var id = String(frame.id);
            console.log('id', id)
            console.log('element', document.getElementById(id));
            var canvas = new fabric.Canvas(id, {
              isDrawingMode: false,
              selection: false
            });
            var json = frame.data;
            canvas.loadFromJSON(json);
            canvas.forEachObject(function(o) {
                o.selectable = false;
            });
            // console.log('new canvas', canvas);
            canvases[id] = canvas;
            return canvases;
        }, {});
        console.log('canvases added', nextCanvases);
        // var nextCanvases = this.state.canvases.concat(canvases);
        // console.log('nextCanvases', nextCanvases);
        this.setState({canvases: nextCanvases});
        FrameStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FrameStore.removeChangeListener(this._onChange);
    },

    setCurrentCanvas: function(e) {
        var targetId = e.target.value;
        var canvas = this.state.canvases[targetId];
        var canvasEl = document.getElementById(targetId);

        console.log('clicked', canvas);
        console.log('element', canvasEl);
        this.setState({currentCanvas: canvas});

        var canvas = this.state.canvases[targetId];
        if (canvas.selection) {
            console.log('disabled', targetId);
            this._disableSelection(canvas);

        } else {
            console.log('enabled', targetId);
            this._enableSelection(canvas);
        }

        // for (var id in this.state.canvases) {
        //     var canvas = this.state.canvases[targetId];
        //     if (id === targetId) {
        //         console.log('enabled', id);
        //         this._enableSelection(canvas);
        //     } else {
        //         console.log('disabled', id);
        //         this._disableSelection(canvas);
        //     }
        // }
    },

    _disableSelection: function(canvas) {
        canvas.selection = false;
        canvas.forEachObject(function(o) {
            o.selectable = false;
        });
    },

    _enableSelection: function(canvas) {
        canvas.selection = true;
        canvas.forEachObject(function(o) {
            o.selectable = true;
        });
    },

    addCanvas: function(canvas) {
        // console.log('canvas in app', canvas);
        // var newCanvases = this.state.canvases.concat([canvas]);
        // console.log('canvases', newCanvases);
        // this.forceUpdate(
        //     () => {
        //         this.setState({canvases: newCanvases})
        //     }
        // );
    },

    render: function() {

        var frameCanvases = this.state.frames.map((frame) => {
            return (
                <FabricCanvas 
                    frame={frame}
                    width={200}
                    height={200}
                    setCurrentCanvas={this.setCurrentCanvas}
                    addCanvas={this.addCanvas}
                />
            );
        });

        var canvasButtons = [];
        for (var id in this.state.canvases) {
            var button = (
                <input type="submit" onClick={this.setCurrentCanvas} value={id} />
            );
            canvasButtons.push(button);
        }

        return (
            <div>
                <LayerSection />
                <h1>Allo Allo</h1>
                {canvasButtons}
                <div id="canvases">
                    {frameCanvases}
                </div>
                <DrawingModeOptions canvas={this.state.currentCanvas} canvasId={1} />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    }
});

module.exports = App;