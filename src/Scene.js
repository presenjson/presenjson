import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Scene = ({ children, ...rest }) => {
    const classes = cx({
        scene: true,
        ...rest
    });
    return <div className={classes}>{children}</div>;
}

Scene.propTypes = {
    length: PropTypes.number
};

Scene.defaultProps = {
    length: 0
}

export default Scene;
