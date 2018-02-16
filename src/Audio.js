import React, { PureComponent } from 'react';

class Audio extends PureComponent {
    constructor(...args) {
        super(...args);

        if (!this.props.length && this.props.src && this.props.onLoad) {
            const a = document.createElement('audio');
            a.onloadedmetadata = (e) => {
                this.props.onLoad(a.duration * 1000);
                a.src = '';
            }
            a.src = this.props.src;
        }
    }

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
