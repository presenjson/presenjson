import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cx from 'classnames';
import Screen from './Screen';
import { Group } from './ClipGroup';
import buckets from './utils/buckets';

export default class Layer extends Component {
    constructor(...args) {
        super(...args);
        this.time = this.props.startAt;
        this.mountedAt = 0;
        this.setClips(this.props.children);

        this.state = {
            bucket: Math.ceil(this.time / 1000),
            onScreen: [],
            buckets: []
        };

        buckets(this.clips, this.props.data).then((state) => {
            this.setState(state);
            this.props.onLoad(state.length);
        });
    }

    componentDidMount() {
        this.mountedAt = new Date().valueOf();

        requestAnimationFrame(this.loop);
    }

    componentWillReceiveProps(nextProps) {
        this.setClips(nextProps.children);
        buckets(this.clips, nextProps.data).then((state) => {
            this.setState(state);
        });
    }

    setClips = (children) => {
        const newChildren = R.pipe(
            R.of,
            R.flatten,
            R.map(
                R.when(
                    (x) => x.type.name === 'ClipGroup',
                    (x) => Group(x.props)
                )
            ),
            R.flatten
        )(children);

        this.clips = newChildren;
    };

    isOnScreen = (time) => (o) =>
        this.state.positions[o] <= time &&
        this.state.positions[o] + this.state.lengths[o] >= time;

    loop = () => {
        const current = new Date().valueOf();

        if (!this.props.paused) {
            this.time = current - this.mountedAt;
            const bucket = Math.ceil(this.time / 1000) - 1;
            const activeBucket = this.state.buckets[bucket] || [];
            const onScreen = activeBucket.filter(this.isOnScreen(this.time));

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

Layer.defaultProps = {};

Layer.propTypes = {
    layer: PropTypes.number,
    startAt: PropTypes.number,
    paused: PropTypes.bool,
    onLoad: PropTypes.func,
    data: PropTypes.any,
    children: PropTypes.node
};
