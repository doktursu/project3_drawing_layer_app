var React = require('react');

var DrawingModeOptions = React.createClass({

    
    render: function() {
        return (
            <div>
                <label htmlFor="drawing-mode-selector">Mode</label>
                <select name="drawing-mode-selector" id="drawing-mode-selector">
                    <option value="Pencil">Pencil</option>
                    <option value="Circle">Circle</option>
                    <option value="Spray">Spray</option>
                    <option value="Pattern">Pattern</option>
                    <option value="hline">hline</option>
                    <option value="vline">vline</option>
                    <option value="square">square</option>
                    <option value="diamond">diamond</option>
                    <option value="texture">texture</option>
                </select>
                <br/>

                <label htmlFor="drawing-line-width">Line width</label>
                <input type="range" id="drawing-line-width" name="drawing-line-width" min="0" max="150" />
                <br/>

                <label htmlFor="drawing-color">Line color</label>
                <input type="color" id="drawing-color" name="drawing-color" />
                <br/>

                <label htmlFor="drawing-shadow-color">Shadow color</label>
                <input type="color" id="drawing-shadow-color" name="drawing-shadow-color" />
                <br/>

                <label htmlFor="drawing-shadow-width">Shadow width</label>
                <input type="range" id="drawing-shadow-width" name="drawing-shadow-width" min="0" max="50" />
                <br/>

                <label htmlFor="drawing-shadow-offset">Shadow width</label>
                <input type="range" id="drawing-shadow-offset" name="drawing-shadow-offset" min="0" max="50" />
                <br/>

                <button id="drawing-mode">Cancel drawing mode</button>
                <br/>

                <button id="clear-canvas">Clear</button>
                <br/>

                <button id="export-json">Export to Json</button>
            </div>
        );
    }
});

module.exports = DrawingModeOptions;