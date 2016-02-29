var React = require('react');

var FabricCanvas = React.createClass({

    componentDidMount: function() {
        var id = String(this.props.id);
        var canvas = new fabric.Canvas(id, {
          isDrawingMode: true
        });
    },

    render: function() {

        return (
            <div class="fabric-canvas">
                <canvas id={this.props.id} width={this.props.width} height={this.props.height} />
            </div>
        );
    }
});

module.exports = FabricCanvas;