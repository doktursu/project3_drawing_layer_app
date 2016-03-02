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
        AppLayerActionCreators.checkVisible(this.props.layer.id);
    },

    _onDeleteClick: function() {
        AppLayerActionCreators.deleteLayer(this.props.layer.id);
    },

    _onMoveUpClick: function() {
        AppLayerActionCreators.moveUpLayer(this.props.layer.id);
    },

    _onMoveDownClick: function() {
        AppLayerActionCreators.moveDownLayer(this.props.layer.id);
    }

});

module.exports = LayerListOptions;