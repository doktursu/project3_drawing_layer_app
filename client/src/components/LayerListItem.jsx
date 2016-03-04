var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');
var classNames = require('classnames');
var LayerListOptions = require('./LayerListOptions.jsx');
var ReactPropTypes = React.PropTypes;

var LayerListItem = React.createClass({

    propTypes: {
        layerID: ReactPropTypes.string,
        currentLayerID: ReactPropTypes.string
    },

    render: function() {
        var layerID = this.props.layerID;
        return (
            <li 
                className={classNames({
                    'layer-list-item': true,
                    'layer-active': layerID === this.props.currentLayerID
                })}
                width={200}
                height={300}>
                <p onClick={this._onClick}>Layer!!! {layerID}</p>
                <LayerListOptions layer={layerID} />
            </li>
        );
    },

    _onClick: function() {
        AppLayerActionCreators.clickLayer(this.props.layerID);
    }

});

module.exports = LayerListItem;

