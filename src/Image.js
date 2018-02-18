import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ style, src, className, ...rest }) => {
    const styles = {
        backgroundImage: `url('${src}')`,
        ...style
    };

    return <div className={`img ${className}`} style={styles} {...rest} />;
};

Image.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    src: PropTypes.string.isRequired
};

Image.defaultProps = {
    style: {},
    className: ''
};

export default Image;
