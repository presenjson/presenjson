import React, { PureComponent } from 'react';
export default class Screen extends PureComponent {
    render() {
        const { component, onScreen } = this.props;
        return <div className={onScreen && 'is-on-screen'}>{component}</div>;
    }
}
