import React from 'react';
import cx from 'classnames';
import * as styles from './utils/styles';

const getStyles = (classes) => {
    const individualStyles = Object.entries(classes)
        .filter((x) => x[1] !== true)
        .map((x) => styles[x[0]] && styles[x[0]](x[1]));
    return Object.assign(...individualStyles, {});
};

export default ({ children, ...rest }) => {
    const individualStyles = getStyles(rest);
    return (
        <div className={cx(rest, 'container')} style={individualStyles}>
            {children}
        </div>
    );
};
