var React = require('react');

var AppAssetActionCreators = require('../actions/AppAssetActionCreators');

var AssetListItem = React.createClass({
    render: function() {
        return (
            <li>
                <img src={this.props.img} />
                {this.props.assetID}
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
        AppAssetActionCreators.destroyAsset(this.props.assetID);
    }
});

module.exports = AssetListItem;