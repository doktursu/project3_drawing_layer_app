var FabricCanvas = require('./FabricCanvas.jsx');
var DrawingModeOptions = require('./DrawingModeOptions.jsx');
var React = require('react');

var App = React.createClass({

    render: function() {
        return (
            <div>
                <h1>Allo Allo</h1>
                <FabricCanvas id={1} width={200} height={200} />
                <DrawingModeOptions canvasId={1} />
            </div>
        );
    }
});

module.exports = App;