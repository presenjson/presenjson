import React from 'react';
import PropTypes from 'prop-types';
import Style from './Style';

const Scene = ({ children, length, ...rest }) => (
    <Style {...rest} scene>
        {children}
    </Style>
);

Scene.propTypes = {
    length: PropTypes.number
};

Scene.defaultProps = {
    length: 0
};

export default Scene;
