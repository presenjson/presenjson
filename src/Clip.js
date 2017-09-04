import React from 'react';
import PropTypes from 'prop-types';

const Clip = (props) => {
    return (<div className='clip'>
        {props.children}
    </div>);
}

Clip.propTypes = {
    length: PropTypes.number
};

Clip.defaultProps = {
    length: 0
}

export default Clip;
