var React = require('react');

var FrameInterval = React.createClass({

    getInitialState: function() {
        return {
            interval: this.props.interval || 100
        };
    },

    render: function() {
        return (
            <input
                type="number"
                min="50"
                max="5000"
                step="100"
                value={this.state.interval}
                onChange={this._onIntervalChange}
                onBlur={this._onIntervalBlur}
                disabled={this.props.disabled}
            />
        );
    },

    _onIntervalChange: function(e) {
        var newInterval = parseInt(e.target.value);
        this.setState({interval: newInterval});
    },

    _onIntervalBlur: function(e) {
        var newInterval = parseInt(e.target.value);
        this.setState({interval: newInterval});
        this._onIntervalSave();
    },

    _onIntervalSave: function() {
        this.props.onSave(this.state.interval);
    }

});

module.exports = FrameInterval;