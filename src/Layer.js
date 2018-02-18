import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cx from 'classnames';
import Screen from './Screen';
import buckets from './utils/buckets';
import flattenClips from './utils/flattenClips';

export default class Layer extends Component {
    constructor(...args) {
        super(...args);
        this.time = this.props.startAt;
        this.mountedAt = 0;
        this.state = {
            bucket: Math.ceil(this.time / 1000) - 1,
            onScreen: [],
            buckets: []
        };

        this.loadClips();
    }

    async loadClips() {
        this.clips = flattenClips(this.props.children);
        const state = await buckets(this.clips, this.props.data);
        this.setState(state);
        this.props.onLoad(state.length);
    }

    componentDidMount() {
        this.mountedAt = Date.now();

        requestAnimationFrame(this.loop);
    }

    isOnScreen = (o) =>
        this.state.positions[o] <= this.time &&
        this.state.positions[o] + this.state.lengths[o] >= this.time;

    loop = () => {
        const current = Date.now();

        if (!this.props.paused) {
            this.time = current - this.mountedAt;
            const bucket = Math.ceil(this.time / 1000) - 1;
            const activeBucket = this.state.buckets[bucket] || [];
            const onScreen = activeBucket.filter(this.isOnScreen);

            this.setState({ bucket, onScreen: onScreen[0] });
        } else {
            this.mountedAt = current - this.time;
        }

        requestAnimationFrame(this.loop);
    };

    render() {
        const currentBucket = this.state.buckets[this.state.bucket] || [];
        const classNames = cx({
            layer: true,
            ...R.pick(['background', 'foreground'], this.props)
        });

        return (
            <div className={classNames}>
                {currentBucket.map((i) => (
                    <Screen
                        {...this.clips[i].props}
                        data={this.props.data}
                        paused={this.props.paused}
                        onScreen={this.state.onScreen === i}
                        key={`${this.props.layer}-screen-${i}`}
                        i={i}
                    />
                ))}
            </div>
        );
    }
}

Layer.defaultProps = {
    children: [],
    startAt: 0
};

Layer.propTypes = {
    layer: PropTypes.number,
    startAt: PropTypes.number,
    paused: PropTypes.bool,
    onLoad: PropTypes.func,
    data: PropTypes.any,
    children: PropTypes.node
};
