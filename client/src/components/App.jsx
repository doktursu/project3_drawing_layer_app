var FabricCanvas = require('./FabricCanvas.jsx');
var DrawingModeOptions = require('./DrawingModeOptions.jsx');
var CanvasStore = require('../stores/CanvasStore.js');
var React = require('react');

function getStateFromStore() {
    return {canvas: CanvasStore.get()}
}

var App = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
    },

    setCurrentCanvas: function(canvas) {
        this.setState({currentCanvas: canvas});
    },

    render: function() {
        return (
            <div>
                <h1>Allo Allo</h1>
                <FabricCanvas id={this.state.canvas.id} width={200} height={200} setCurrentCanvas={this.setCurrentCanvas} />
                <DrawingModeOptions canvas={this.state.currentCanvas} canvasId={1} />
            </div>
        );
    }
});

module.exports = App;