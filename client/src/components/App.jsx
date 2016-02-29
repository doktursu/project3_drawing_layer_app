var FabricCanvas = require('./FabricCanvas.jsx');
var DrawingModeOptions = require('./DrawingModeOptions.jsx');
var FrameStore = require('../stores/FrameStore.js');
var React = require('react');

function getStateFromStore() {
    return {frames: FrameStore.getAll()}
}

var App = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
    },

    componentDidMount: function() {
        FrameStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FrameStore.removeChangeListener(this._onChange);
    },

    setCurrentCanvas: function(canvas) {
        this.setState({currentCanvas: canvas});
    },

    render: function() {
        return (
            <div>
                <h1>Allo Allo</h1>
                <FabricCanvas frame={this.state.frames['f_1']} width={200} height={200} setCurrentCanvas={this.setCurrentCanvas} />
                <DrawingModeOptions canvas={this.state.currentCanvas} canvasId={1} />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    }
});

module.exports = App;