import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cx from 'classnames';
import Layer from './Layer';
import DefaultPoster from './DefaultPoster';

class PresenJson extends Component {
    layersToRender = [];
    layersLoaded = 0;
    length = 0;

    state = {
        paused: !(this.props.autoPlay || this.props.play),
        initial: true,
        length: 0
    };

    constructor(...args) {
        super(...args);
        this.setLayers();
    }

    componentDidMount() {
        const paused = !(this.props.play || this.props.autoPlay);
        this.setState({ paused, initial: !this.props.play });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.play !== this.props.play) {
            const paused = !nextProps.play;
            this.setState({ paused, initial: false });
        }
    }

    setLayers = () => {
        const layers = R.flatten(R.of(this.props.children));
        const soloLayers = layers.filter(R.pathEq(['props', 'solo'], true));
        this.layersToRender = (soloLayers.length && soloLayers) || layers;
    };

    onLoad = (length) => {
        this.length = Math.max(length, this.length);
        this.layersLoaded += 1;
        return (
            this.layersLoaded === this.layersToRender.length &&
            this.props.onLoad(this.length)
        );
    };

    togglePlayback = () => {
        this.setState({ paused: !this.state.paused, initial: false });
    };

    render() {
        const classNames = cx('presenjson', {
            paused: this.state.paused && !this.state.initial,
            initial: this.state.initial
        });
        const Poster = this.props.poster;

        return (
            <div className={classNames} onClick={this.togglePlayback}>
                <div className="layers">
                    {this.layersToRender.map((track, i) => (
                        <Layer
                            {...track.props}
                            data={this.props.data}
                            paused={this.state.paused}
                            startAt={this.props.startAt}
                            layer={i}
                            onLoad={this.onLoad}
                            key={i}
                        />
                    ))}
                </div>
                {this.state.initial &&
                    Poster && (
                        <div className="poster">
                            {typeof Poster === 'string' && <DefaultPoster src={Poster} /> || <Poster {...this.props} />}
                        </div>
                    )}
                <div className="playback-state" />
            </div>
        );
    }
}

PresenJson.propTypes = {
    poster: PropTypes.any,
    play: PropTypes.bool,
    autoPlay: PropTypes.bool,
    startAt: PropTypes.number,
    onLoad: PropTypes.func,
    data: PropTypes.any,
    children: PropTypes.node
};

PresenJson.defaultProps = {
    startAt: 0,
    debug: false,
    autoPlay: false,
    data: {},
    onLoad: () => {},
    children: []
};

export default PresenJson;
