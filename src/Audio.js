import React, { PureComponent } from 'react';

class Audio extends PureComponent {
    componentDidMount() {
        const action = (this.props.play && this.audio.paused && 'play' || 'pause');
        this.audio[action]();
        this.audio.volume = this.props.volume;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.play !== this.props.play) {
            const action = (nextProps.play && this.audio.paused && 'play' || 'pause');
            this.audio[action]();
        }
        if(nextProps.volume !== this.props.volume) {
            this.audio.volume = nextProps.volume;
        }
    }

    render() {
        const { src, play, ...rest } = this.props;
        return (
            <audio ref={(_) => (this.audio = _)} {...rest}>
              {src && <source src={src} type="audio/mpeg" />}
              {this.props.children}
            </audio>
        );
    }
}

Audio.defaultProps = {
    volume: 1
}

export default Audio;
