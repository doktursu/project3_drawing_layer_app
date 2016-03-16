var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');

var LayerListOptions = React.createClass({

    render: function() {
        return (
            <div>
                <input type="checkbox" onChange={this._onChange} />Hide
                <button onClick={this._onMoveUpClick}>MoveUp</button>
                <button onClick={this._onMoveDownClick}>MoveDown</button>
                <button onClick={this._onDeleteClick}>Delete</button>
            </div>
        );
    },

    _onChange: function() {
        var checked = this.checked;
        AppLayerActionCreators.toggleVisibility(this.props.layerID);
    },

    _onDeleteClick: function() {
        AppLayerActionCreators.destroyLayer(this.props.layerID);
    },

    _onMoveUpClick: function() {
        AppLayerActionCreators.moveUpLayer(this.props.layerID);
    },

    _onMoveDownClick: function() {
        AppLayerActionCreators.moveDownLayer(this.props.layerID);
    }

});

module.exports = LayerListOptions;