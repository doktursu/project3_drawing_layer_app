var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');

var LayerListOptions = React.createClass({

    render: function() {
        return (
            <div>
                <input type="checkbox" onChange={this._onChange} />Hide
            </div>
        );
    },

    _onChange: function() {
        var checked = this.checked;
        AppLayerActionCreators.checkVisible(this.props.layer.id);
    }

});

module.exports = LayerListOptions;