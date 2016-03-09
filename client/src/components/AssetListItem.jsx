var React = require('react');

var AppWebAPIUtils = require('../utils/AppWebAPIUtils');
var AppAssetActionCreators = require('../actions/AppAssetActionCreators');

var NameEditInput = require('./NameEditInput');

var AssetListItem = React.createClass({

    getInitialState: function() {
        return {
            isEditingName: false,
            assetName: this.props.assetName
        };
    },

    render: function() {

        var assetID = this.props.assetID;

        var input;
        if (this.state.isEditingName) {
            input =
                <NameEditInput
                    className="edit"
                    onSave={this._onSave}
                    name={this.state.assetName}
                />;

        } else {
            input =
            <p 
                onDoubleClick={this._onDoubleClick}
            >
                {this.state.assetName}
            </p>
        }

        return (
            <li>
                <img src={this.props.img} />
                {input}
                <button onClick={this._onAddClick}>
                    Add
                </button>
                <button onClick={this._onDeleteClick}>
                    Delete
                </button>
            </li>
        );
    },

    _onAddClick: function() {
        AppAssetActionCreators.clickAsset(this.props.assetID);
    },

    _onDeleteClick: function() {
        AppWebAPIUtils.destroyAsset(this.props.assetID);
    },

    _onDoubleClick: function() {
        this.setState({isEditingName: true});
    },

    _onSave: function(name) {
        this.setState({
            isEditingName: false,
            assetName: name
        });
        AppWebAPIUtils.updateAsset(this.props.assetID, name);
    }
});

module.exports = AssetListItem;