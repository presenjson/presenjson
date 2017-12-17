import React, { Component} from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
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
        const classNames = cx('presenjson', {
            paused: this.state.paused && !this.state.initial,
            initial: this.state.initial
        });
        const layers = R.flatten(R.of(this.props.children));
        const soloLayers = layers.filter(R.pathEq([ 'props', 'solo' ], true));
        const layersToRender = soloLayers.length && soloLayers || layers;
        const Poster = this.props.poster;

        return (<div className={classNames} onClick={this.togglePlayback}>
            <div className='layers'>
                {layersToRender.map((track, i) => <Layer
                    {...track.props}
                    data={this.props.data}
                    paused={this.state.paused}
                    startAt={this.props.startAt}
                    layer={i}
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
