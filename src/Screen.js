import React, { PureComponent } from 'react';

export default class Screen extends PureComponent {
    render() {
        const { component: Clip, ...props } = this.props;
        return (Clip && <div className={props.onScreen && 'is-on-screen'}>
            <Clip {...props} />
        </div> || false);
    }
}
