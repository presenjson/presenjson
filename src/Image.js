import React from 'react';
import cx from 'classnames';

const Image = ({ style, src, className, ...rest }) => {
    const styles = {
        backgroundImage: `url('${src}')`,
        ...style
    };

    const classes = cx({
        img: true,
        [className]: true,
        ...rest
    });

    return (
        <div className={classes} style={styles} />
    );
}

Image.defaultProps = {
    fullscreen: false,
    style: {},
    className: ''
};

export default Image;
