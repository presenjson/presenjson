import React, { PureComponent } from 'react';
import cx from 'classnames';

class Video extends PureComponent {
    componentDidMount() {
        const action = (this.props.play && this.video.paused && 'play' || 'pause');
        this.video[action]();
        this.video.volume = this.props.volume;
        this.video.playbackRate = this.props.playbackRate
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.play !== this.props.play) {
            const action = (nextProps.play && this.video.paused && 'play' || 'pause');
            this.video[action]();
        }
        if(nextProps.volume !== this.props.volume) {
            this.video.volume = nextProps.volume;
        }

        if(nextProps.playbackRate !== this.props.playbackRate) {
            this.video.playbackRate = nextProps.playbackRate;
        }

    }

    render() {
        const { src, play, playbackRate, ...rest } = this.props;
        const classes = cx({ ...rest, video: true });
        return (
            <video ref={(_) => (this.video = _)}
                className={classes}>
              {src && <source src={src} type='video/mp4' />}
              {this.props.children}
          </video>
        );
    }
}

Video.defaultProps = {
    volume: 1,
    playbackRate: 1,
    fullScreen: true
}

export default Video;
