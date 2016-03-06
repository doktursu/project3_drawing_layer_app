var React = require('react');

var ENTER_KEY_CODE = 13;

var LayerNameEditInput = React.createClass({

    getInitialState: function() {
        return {
            name: this.props.name || ''
        };
    },

    render: function() {
        return (
            <input
                id={this.props.id}
                placeholder={this.state.name}
                value={this.state.name}
                onBlur={this._save}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
                autoFocus={true}
            />
        );
    },

    _save: function() {
        var name = this.state.name.trim();
        this.props.onSave(name);
        this.setState({
            name: ''
        });
    },

    _onChange: function(event) {
        this.setState({
            name: event.target.value
        });
    },

    _onKeyDown: function(event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        this._save();
      }
    }

});

module.exports = LayerNameEditInput;