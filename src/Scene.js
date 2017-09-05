import React from 'react';
import PropTypes from 'prop-types';

const Scene = (props) => {
    return (<div className='clip'>
    {props.children}
    </div>);
}

Scene.propTypes = {
    length: PropTypes.number
};

Scene.defaultProps = {
    length: 0
}

export default Scene;
