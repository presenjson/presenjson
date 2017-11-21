import React, { Component} from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import cx from 'classnames';
import Layer from './Layer';

class PresenJson extends Component {
    state = {
        paused: !this.props.autoPlay,
        initial: true
    }

    togglePlayback = () => {
        this.setState({ paused: !this.state.paused, initial: false });
    }

    render() {
        const classNames = cx({
            presenjson: true,
            paused: this.state.paused && !this.state.initial,
            initial: this.state.initial
        });
        const layers = R.flatten(R.of(this.props.children));
        const Poster = this.props.poster;

        return (<div className={classNames} onClick={this.togglePlayback}>
            <div className='layers'>
                {layers.map((track, i) => <Layer
                    {...track.props}
                    data={this.props.data}
                    paused={this.state.paused}
                    startAt={this.props.startAt}
                    key={i} />)}
            </div>
            {this.state.initial && Poster && <div className='poster'><Poster {...this.props} /></div>}
            <div className='playback-state' />
        </div>);
    }
}

PresenJson.defaultProps = {
    startAt: 0,
    debug: false,
    autoPlay: false,
    data: {}
};

export default PresenJson;
