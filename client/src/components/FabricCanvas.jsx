var React = require('react');

var FabricCanvas = React.createClass({

    componentDidMount: function() {
        var frame = this.props.frame;
        var id = String(frame.id);

        var canvas = new fabric.Canvas(id, {
          isDrawingMode: true
        });
        // var json = {"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}
        // var json = JSON.parse(frame.data);
        // var json = JSON.stringify(json);
        var json = frame.data;
        
        canvas.loadFromJSON(json);
        this.props.setCurrentCanvas(canvas);
    },

    render: function() {

        return (
            <div class="fabric-canvas">
                <canvas id={this.props.frame.id} width={this.props.width} height={this.props.height} />
            </div>
        );
    }
});

module.exports = FabricCanvas;