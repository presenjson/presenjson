import React, { Component } from 'react';
import Clip from './Clip';
import Scene from './Scene';

export const Group = ({ map, ...props }) => {
    return map.map((x) => <Clip {...props} {...x} />);
};

Group.defaultProps = {
    map: []
};

class ClipGroup extends Component {
    render = () => false
}

ClipGroup.defaultProps = {
    length: 0,
    delay: 0
};

export default ClipGroup;
