import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Video extends PureComponent {
    componentDidMount() {
        const action =
            (this.props.play && this.video.paused && 'play') || 'pause';
        this.video[action]();
        this.video.volume = this.props.volume;
        this.video.playbackRate = this.props.playbackRate;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.play !== this.props.play) {
            const action =
                (nextProps.play && this.video.paused && 'play') || 'pause';
            this.video[action]();
        }
        if (nextProps.volume !== this.props.volume) {
            this.video.volume = nextProps.volume;
        }

        if (nextProps.playbackRate !== this.props.playbackRate) {
            this.video.playbackRate = nextProps.playbackRate;
        }
    }

    render() {
        const { src, play, playbackRate, className = '', ...rest } = this.props;
        return (
            <video
                ref={(_) => (this.video = _)}
                className={`video ${className}`}
                {...rest}
            >
                {src && <source src={src} type="video/mp4" />}
                {this.props.children}
            </video>
        );
    }
}

Video.propTypes = {
    play: PropTypes.bool,
    src: PropTypes.string,
    playbackRate: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    volume: PropTypes.number
};

Video.defaultProps = {
    volume: 1,
    playbackRate: 1,
    fullScreen: true
};

export default Video;
