var AppLayerActionCreators = require('../actions/AppLayerActionCreators.js');

var LayerListItem = require('./LayerListItem.jsx');
var React = require('react');

var LayerStore = require('../stores/LayerStore');

function getStateFromStore() {
    return {
        layers: LayerStore.getOrder(),
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
        var layerListItems = this.state.layers.map(function(layerID, index) {
            return (
                <LayerListItem
                    key={layerID}
                    layerID={layerID}
                    currentLayerID={this.state.currentLayerID}
                />
            );
        }.bind(this));
        layerListItems.reverse();

        return (
            <div>
                <h2>Layers</h2>
                <ul>
                    {layerListItems}
                </ul>
                <button onClick={this._onAddLayerClick}>Add Layer</button>
            </div>
        );
    },

    _onAddLayerClick: function() {
        AppLayerActionCreators.createLayer();
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    }

});

module.exports = LayerSection;