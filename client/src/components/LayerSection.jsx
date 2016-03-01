var LayerListItem = require('./LayerListItem.jsx');
var React = require('react');

var LayerStore = require('../stores/LayerStore');

function getStateFromStore() {
    return {
        layers: LayerStore.getAllOrdered(),
        currentLayerID: LayerStore.getCurrentID()
    };
}

var LayerSection = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
    },

    componentDidMount: function() {
        LayerStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LayerStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var layerListItems = this.state.layers.map(function(layer) {
            return (
                <LayerListItem
                    key={layer.id}
                    layer={layer}
                    currentLayerID={this.state.currentLayerID}
                />
            );
        }.bind(this));

        return (
            <div>
                <h2>Layers</h2>
                <ul>
                    {layerListItems}
                </ul>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    }

});

module.exports = LayerSection;