var AppFrameActionCreators = require('../actions/AppFrameActionCreators');

var FrameInterval = require('./FrameInterval');

var React = require('react');
var FrameStore = require('../stores/FrameStore.js');

function getStateFromStore() {
    return {
        frames: FrameStore.getOrder(),
        currentFrameID: FrameStore.getCurrentID(),
        interval: FrameStore.getInterval()
    };
}

var FrameSelector = React.createClass({

    getInitialState: function() {
        return {
            frames: FrameStore.getOrder(),
            currentFrameID: FrameStore.getCurrentID(),
            interval: FrameStore.getInterval(),
            isPlayingMode: false,
            direction: 'normal'
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
                <button
                    onClick={this._onClick}
                    disabled={this.state.isPlayingMode}>
                    Add Frame
                </button>
                <FrameInterval
                    onSave={this._onIntervalSave}
                    interval={this.state.interval}
                    disabled={this.state.isPlayingMode} 
                />
                <select 
                    onChange={this._onSelectChange}
                    disabled={this.state.isPlayingMode}>
                    <option value="normal">Normal</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate</option>
                </select>
                <button
                    onClick={this._toggleAnimation}>
                    {this.state.isPlayingMode ? 'Stop' : 'Play'}
                </button>
            </div>
        );
    },

    componentDidUpdate: function() {
        if (this.state.isPlayingMode) {
            switch (this.state.direction) {
                case 'normal':
                    setTimeout(function() {
                      AppFrameActionCreators.clickNextFrame();
                    }, this.state.interval);
                    break;
                case 'reverse':
                    setTimeout(function() {
                      AppFrameActionCreators.clickPreviousFrame();
                    }, this.state.interval);
                    break;
                case 'alternate':
                    setTimeout(function() {
                      AppFrameActionCreators.clickNextFrameAlt();
                    }, this.state.interval);
                    break;
                default:
            }
            
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

    _onIntervalSave: function(frameInterval) {
        AppFrameActionCreators.setFrameInterval(frameInterval);
    },

    _onSelectChange: function(e) {
        var newDirection = e.target.value;
        this.setState({direction: newDirection});
    },

    _toggleAnimation: function() {
        var nextPlayMode = !this.state.isPlayingMode;
        this.setState({isPlayingMode: nextPlayMode});
    }

});

module.exports = FrameSelector;