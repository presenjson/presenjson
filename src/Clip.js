import PropTypes from 'prop-types';

const Clip = () => false;

Clip.propTypes = {
    length: PropTypes.number,
    delay: PropTypes.number
};

Clip.defaultProps = {
    length: 0,
    delay: 0
};

export default Clip;
