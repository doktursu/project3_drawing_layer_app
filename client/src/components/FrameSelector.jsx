var AppFrameActionCreators = require('../actions/AppFrameActionCreators');

var React = require('react');
var FrameStore = require('../stores/FrameStore.js');

function getStateFromStore() {
    return {
        frames: FrameStore.getOrder(),
        currentFrameID: FrameStore.getCurrentID()
    };
}

var FrameSelector = React.createClass({

    getInitialState: function() {
        return {
            frames: FrameStore.getOrder(),
            currentFrameID: FrameStore.getCurrentID(),
            playMode: false
        };
    },

    componentDidMount: function() {
        FrameStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FrameStore.removeChangeListener(this._onChange);
    },

    render: function() {

        var radioButtons = this.state.frames.map(function(frameID) {
            return <input
                type="radio"
                key={frameID}
                name="frame"
                value={frameID}
                onChange={this._onRadioChange}
                checked={frameID === this.state.currentFrameID} />
        }, this);

        return (
            <div>
                <form>
                    {radioButtons}
                </form>
                <button onClick={this._onClick}>Add Frame</button>
                <button onClick={this._toggleAnimation}>Play</button>
            </div>
        );
    },

    componentDidUpdate: function() {
        if (this.state.playMode) {
            setTimeout(function() {
              AppFrameActionCreators.clickNextFrame();
            }, 100)
        }
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    },

    _onRadioChange: function(e) {
        console.log('radio button', e.target.value);
        var frameID = e.target.value;
        AppFrameActionCreators.clickFrame(frameID);
        this.setState(getStateFromStore());
    },

    _onClick: function() {
        AppFrameActionCreators.createFrame();
        this.setState(getStateFromStore());
    },

    _toggleAnimation: function() {
        var nextPlayMode = !this.state.playMode;
        this.setState({playMode: nextPlayMode});
    }

});

module.exports = FrameSelector;