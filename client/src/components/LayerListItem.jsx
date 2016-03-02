var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');
var classNames = require('classnames');
var LayerListOptions = require('./LayerListOptions.jsx');
var ReactPropTypes = React.PropTypes;

var LayerListItem = React.createClass({

    propTypes: {
        layer: ReactPropTypes.object,
        currentLayerIndex: ReactPropTypes.number
    },

    render: function() {
        var layer = this.props.layer;
        return (
            <li 
                className={classNames({
                    'layer-list-item': true,
                    'layer-active': layer.id === this.props.currentLayerIndex
                })}
                onClick={this._onClick} width={200} height={300}>
                <p>Layer!!! {layer.index}</p>
                <LayerListOptions layer={layer} />
            </li>
        );
    },

    _onClick: function() {
        AppLayerActionCreators.clickLayer(this.props.layer.id);
    }

});

module.exports = LayerListItem;

