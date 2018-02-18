import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Style = ({ children, style, ...rest }) => (
    <div className={cx(rest, 'container')} style={style}>
        {children}
    </div>
);

Style.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
};

export default Style;
