import React from 'react';
import cx from 'classnames';

export default ({ children, ...rest }) => <div className={cx(rest, 'container')}>{children}</div>;
