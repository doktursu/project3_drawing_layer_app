var React = require('react');

var FabricCanvas = React.createClass({

    getInitialState: function() {
        return {canvas: null, group: []};
    },

    // componentDidMount: function() {
    //     var frame = this.props.frame;
    //     var id = String(frame.id);

    //     var canvas = new fabric.Canvas(id, {
    //       isDrawingMode: true
    //     });

    //     canvas.on('path:created', function(e) {
    //         // var objects = canvas.getObjects();
    //         // var object = objects[objects.length - 1];
    //         // console.log('last', JSON.stringify(object));

    //         var path = e.path;
    //         console.log('path', path);
    //         var nextGroup = this.state.group.concat([path]);
    //         this.setState({group: nextGroup});
    //     }.bind(this));

    //     // this.setState({canvas: canvas});
    //     // var json = {"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}

    //     var json = frame.data;
    //     canvas.loadFromJSON(json);

    //     this.setState({canvas: canvas});
    //     // console.log('state canvas', canvas);
    //     this.props.addCanvas(canvas);
    //     this.props.setCurrentCanvas(canvas);
    // },

    render: function() {

        return (
            <div className="fabric-canvas">
                <canvas id={this.props.frame.id} width={this.props.width} height={this.props.height} onMouseUp={this._onChange} />
            </div>
        );
    },

    _onClick: function() {

    },

    _onChange: function() {
        console.log('canvas', JSON.stringify(this.state.canvas));
    }
});

module.exports = FabricCanvas;