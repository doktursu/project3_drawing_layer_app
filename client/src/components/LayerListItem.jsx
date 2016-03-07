var AppLayerActionCreators = require('../actions/AppLayerActionCreators');
var React = require('react');
var classNames = require('classnames');
var LayerStore = require('../stores/LayerStore');

var LayerNameEditInput = require('./LayerNameEditInput');
var LayerListOptions = require('./LayerListOptions.jsx');
var ReactPropTypes = React.PropTypes;

var LayerListItem = React.createClass({

    getInitialState: function() {
        return {
            isEditingName: false,
            layerName: LayerStore.getNameForLayer(this.props.layerID)
        };
    },

    propTypes: {
        layerID: ReactPropTypes.string,
        currentLayerID: ReactPropTypes.string
    },

    render: function() {
        var layerID = this.props.layerID;

        var input;
        if (this.state.isEditingName) {
            input =
                <LayerNameEditInput
                    className="edit"
                    onSave={this._onSave}
                    name={this.state.layerName}
                />;

        } else {
            input =
            <p 
                onClick={this._onClick}
                onDoubleClick={this._onDoubleClick}
            >
                {this.state.layerName}
            </p>
        }

        return (
            <li 
                className={classNames({
                    'layer-list-item': true,
                    'layer-active': layerID === this.props.currentLayerID
                })}
                width={200}
                height={300}>
                {input}
                <LayerListOptions layerID={layerID} />
            </li>
        );
    },

    _onClick: function() {
        AppLayerActionCreators.clickLayer(this.props.layerID);
    },

    _onDoubleClick: function() {
        this.setState({isEditingName: true});
    },

    _onSave: function(name) {
        this.setState({
            isEditingName: false,
            layerName: name
        });
        AppLayerActionCreators.renameLayer(this.props.layerID, this.state.layerName);
    }
});

module.exports = LayerListItem;

