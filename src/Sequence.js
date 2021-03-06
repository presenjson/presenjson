import { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Sequence extends PureComponent {
    time = 0;
    mountedAt = 0;

    state = {
        step: 0,
        maxSteps: this.props.children.length
    };

    componentDidMount() {
        this.mountedAt = Date.now();
        requestAnimationFrame(this.loop);
    }

    loop = () => {
        const current = Date.now();

        if (this.props.play) {
            this.time = current - this.mountedAt;
            const currentStep = Math.ceil(this.time / this.props.stepLength);

            this.setState({ step: Math.min(currentStep, this.state.maxSteps) });
        } else {
            this.mountedAt = current - this.time;
        }

        requestAnimationFrame(this.loop);
    };

    render() {
        const { children, stepLength, ...props } = this.props;
        return Array(this.state.step)
            .fill(0)
            .map((o, i) => cloneElement(children[i], { key: i, ...props }));
    }
}

Sequence.propTypes = {
    play: PropTypes.bool,
    stepLength: PropTypes.number,
    children: PropTypes.node
};

Sequence.defaultProps = {
    children: [],
    stepLength: 1000
};

export default Sequence;
