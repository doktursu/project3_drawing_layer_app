var React = require('react');

var DrawingModeOptions = React.createClass({

    _drawingModeElonclick: function() {
        // var canvas = this.props.canvas;
        // canvas.isDrawingMode = !canvas.isDrawingMode;

        // var freeDrawingBrushOptions = {
        //     'color': 'red',
        //     'width': 10
        // };

        // Object.keys(freeDrawingBrushOptions).forEach(function(key) {
        //     var value = freeDrawingBrushOptions[key];
        //     console.log(key, ':', value);
        //     canvas.freeDrawingBrush[key] = value;
        // });

        // if (canvas.isDrawingMode) {
        //     this.innerHTML = 'Cancel drawing mode';
        //     // drawingOptionsEl.style.display = '';
        // }
        // else {
        //     this.innerHTML = 'Enter drawing mode';
        //     // drawingOptionsEl.style.display = 'none';
        // }
    },

    handleClick: function() {
        console.log('clicked');
    },

    getInitialState: function() {
        return {
            isDrawingMode: true,
            color: 'black',
            width: 10
        };
    },
    
    render: function() {

        var drawingOptions;
        if (this.state.isDrawingMode) {
            drawingOptions = (
            <div>
                <label htmlFor="drawing-mode-selector">Mode</label>
                <select name="drawing-mode-selector" id="drawing-mode-selector">
                    <option value="Pencil">Pencil</option>
                    <option value="Circle">Circle</option>
                    <option value="Spray">Spray</option>
                    <option value="square">square</option>
                    <option value="diamond">diamond</option>
                    <option value="texture">texture</option>
                </select>
                <br/>

                <label htmlFor="drawing-line-width">Line width: {this.state.width}</label>
                <br />
                <input
                    type="range"
                    id="drawing-line-width"
                    name="drawing-line-width"
                    min="1"
                    max="150"
                    value={this.state.width}
                    onChange={this._onLineWidthChange} />
                <br/>

                <label htmlFor="drawing-color">Line color</label>
                <input
                    type="color"
                    id="drawing-color"
                    name="drawing-color"
                    onChange={this._onColorChange} />
                <br/>
            </div>
            );
        }

        return (
            <div>
                <button
                    id="drawing-mode"
                    onClick={this._onDrawingModeClick}>
                    {this.state.isDrawingMode ? 'Cancel Drawing Mode' : 'Enter Drawing Mode'}
                </button>
                <br/>

                {drawingOptions}

                <button id="clear-canvas">Clear</button>
                <br/>

                <button id="export-json">Export to Json</button>
            </div>
        );
    },

    _onColorChange: function(e) {
        var color = e.target.value;
        this.props.canvas.freeDrawingBrush.color = color;
    },

    _onLineWidthChange: function(e) {
        var width = e.target.value;
        this.setState({width: width});
        this.props.canvas.freeDrawingBrush.width = width;
    },

    _onDrawingModeClick: function(e) {
        var canvas = this.props.canvas;
        canvas.isDrawingMode = !canvas.isDrawingMode;
        this.setState({isDrawingMode: canvas.isDrawingMode});

    },
});

module.exports = DrawingModeOptions;