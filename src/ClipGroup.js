import React, { Component } from 'react';
import Clip from './Clip';

export const Group = ({ map, ...props }) =>
    map.map((x, i) => <Clip {...props} {...x} key={i} />);

Group.defaultProps = {
    map: []
};

class ClipGroup extends Component {
    render = () => false;
}

ClipGroup.defaultProps = {
    length: 0,
    delay: 0
};

export default ClipGroup;
