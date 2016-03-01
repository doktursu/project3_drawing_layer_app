var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');

var LayerListOptions = React.createClass({

    render: function() {
        return (
            <input type="checkbox" checked="true" onChange={this._onChange} />
        );
    },

    _onChange: function() {
        var checked = this.checked;
        AppLayerActionCreators.checkVisible(this.props.layer.id);
    }

});

module.exports = LayerListOptions;