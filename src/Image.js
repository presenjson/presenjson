import React from 'react';

const Image = ({ style, src, className, ...rest }) => {
    const styles = {
        backgroundImage: `url('${src}')`,
        ...style
    };

    return <div className={`img ${className}`} style={styles} />;
};

Image.defaultProps = {
    style: {},
    className: ''
};

export default Image;
