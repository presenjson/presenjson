import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Screen extends PureComponent {
    render() {
        const { component: Clip, ...props } = this.props;
        return (
            (Clip && (
                <div className={(props.onScreen && 'is-on-screen') || 'is-not-on-screen'}>
                    <Clip {...props} play={props.onScreen && !props.paused} />
                </div>
            )) ||
            false
        );
    }
}

Screen.propTypes = {
    component: PropTypes.any,
    onScreen: PropTypes.bool,
    paused: PropTypes.bool
};
