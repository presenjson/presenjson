import React, { PureComponent } from 'react';
import R from 'ramda';
import cx from 'classnames';
import Screen from './Screen';
import buckets from './utils/buckets';
window.R = R;

export default class PresenJson extends PureComponent {
    constructor(...args) {
        super(...args)
        this.time = this.props.startAt;
        this.mountedAt = 0;
        this.children = R.flatten(R.of(this.props.children));

        this.state = {
            paused: !this.props.autoPlay,
            bucket: Math.ceil(this.time / 1000),
            onScreen: [],
            ...buckets(this.children)
        }
    }

    componentDidMount() {
        this.mountedAt = new Date().valueOf();
        console.log(this.state.paused);

        requestAnimationFrame(this.loop);
    };

    componentWillReceiveProps(nextProps){
        this.children = R.flatten(R.of(this.props.children));
        this.setState(buckets(this.children))
    }

    togglePlayback = () => {
        this.setState({ paused: !this.state.paused });
    }

    isOnScreen = (time) => (o) => {
        return this.state.positions[o] <= time &&
        (this.state.positions[o] + this.state.lengths[o]) >= time;
    }

    loop = () => {
        const current = new Date().valueOf();

        if(!this.state.paused) {
            this.time = current - this.mountedAt;
            const bucket = Math.ceil(this.time / 1000) - 1;
            const activeBucket = this.state.buckets[bucket] || [];
            const onScreen = activeBucket.filter(this.isOnScreen(this.time));

            this.setState({ bucket, onScreen: onScreen[0] })
        } else {
            this.mountedAt = current - this.time;
        }

        requestAnimationFrame(this.loop);
    }

    render() {
        const currentBucket = this.state.buckets[this.state.bucket] || [];
        const classNames = cx({
            presenjson: true,
            paused: this.state.paused && this.time,
            initial: !this.time
        });

        return (
            <div className={classNames}
                onClick={this.togglePlayback}>
                <div className='screens'>
                    {currentBucket.map((i) =>
                        <Screen key={`screen-${i}`} i={i}
                            {...this.children[i].props}
                            paused={this.state.paused}
                            onScreen={this.state.onScreen === i} />
                )}
                </div>
                <div className='playback-state' />
            </div>
    );
    }
}

PresenJson.defaultProps = {
    startAt: 0,
    debug: false,
    autoPlay: false
};

PresenJson.propTypes = {
};
