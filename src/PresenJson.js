import React, { PureComponent } from 'react';
import R from 'ramda';
import Screen from './Screen';
import buckets from './utils/buckets';
window.R = R;

export default class PresenJson extends PureComponent {
    constructor(...args) {
        super(...args)
        this.time = this.props.startAt;
        this.mountedAt = 0;
        this.children = R.flatten(this.props.children);

        this.state = {
            bucket: Math.ceil(this.time / 1000),
            onScreen: [],
            ...buckets(this.children)
        }
    }

    componentDidMount() {
        this.mountedAt = new Date().valueOf();

        requestAnimationFrame(this.loop);
    };

    isOnScreen = (time) => (o) => {
        return this.state.positions[o] <= time &&
        (this.state.positions[o] + this.state.lengths[o]) >= time;
    }

    loop = () => {
        const current = new Date().valueOf();
        const loopDelta = (current - this.time) - this.mountedAt;
        const time = current - this.mountedAt;
        const bucket = Math.ceil(time / 1000) - 1;
        const activeBucket = this.state.buckets[bucket] || [];
        const onScreen = activeBucket.filter(this.isOnScreen(time));

        this.time = time;
        this.setState({ bucket, onScreen: onScreen[0] })

        requestAnimationFrame(this.loop);
    }

    componentWillReceiveProps(nextProps){
        this.children = R.flatten(nextProps.children);

        this.setState(buckets(this.children))
    }

    render() {
        const currentBucket = this.state.buckets[this.state.bucket] || [];
        return (
            <div className='presenjson'>
                {currentBucket.map((i) =>
                    <Screen key={`screen-${i}`} i={i}
                        component={this.children[i]}
                        onScreen={this.state.onScreen === i} />
                )}
            </div>
    );
    }
}

PresenJson.defaultProps = {
    startAt: 0,
    debug: false
};

PresenJson.propTypes = {
};
