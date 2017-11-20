import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';

const Scene = ({ children, length, ...rest }) =>  <Container {...rest} scene>{children}</Container>;

Scene.propTypes = {
    length: PropTypes.number
};

Scene.defaultProps = {
    length: 0
}

export default Scene;
