var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');

var LayerListOptions = React.createClass({

    render: function() {
        return (
            <div>
                <input type="checkbox" onChange={this._onChange} />Hide
                <button onClick={this._onClick}>Delete</button>
            </div>
        );
    },

    _onChange: function() {
        var checked = this.checked;
        AppLayerActionCreators.checkVisible(this.props.layer.id);
    },

    _onClick: function() {
        AppLayerActionCreators.deleteLayer(this.props.layer.id);
    }

});

module.exports = LayerListOptions;