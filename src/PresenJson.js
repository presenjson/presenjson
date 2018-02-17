import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cx from 'classnames';
import Layer from './Layer';

class PresenJson extends Component {
    _layersToRender = [];
    _layersLoaded = 0;
    _length = 0;

    state = {
        paused: !this.props.autoPlay,
        initial: true,
        length: 0
    };

    constructor(...args) {
        super(...args);
        this._setLayers();
    }

    componentDidMount() {
        const paused = !(this.props.play && this.state.paused);
        this.setState({ paused, initial: !this.props.play });
    }

    componentWillReceiveProps(nextProps) {
        const paused = !(this.props.play && this.state.paused);
        this.setState({ paused, initial: !this.props.play });
    }

    _setLayers = () => {
        const layers = R.flatten(R.of(this.props.children));
        const soloLayers = layers.filter(R.pathEq(['props', 'solo'], true));
        this._layersToRender = (soloLayers.length && soloLayers) || layers;
    };

    onLoad = (length) => {
        this._length = Math.max(length, this._length);
        return (
            ++this._layersLoaded === this._layersToRender.length &&
            this.props.onLoad(this._length)
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
                    {this._layersToRender.map((track, i) => (
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
                            <Poster {...this.props} />
                        </div>
                    )}
                <div className="playback-state" />
            </div>
        );
    }
}

PresenJson.defaultProps = {
    startAt: 0,
    debug: false,
    autoPlay: false,
    data: {},
    onLoad: () => {}
};

export default PresenJson;
