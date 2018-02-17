import { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Stack extends PureComponent {
    time = 0;
    mountedAt = 0;

    state = {
        step: 0,
        maxSteps: this.props.children.length
    };

    componentDidMount = () => {
        this.mountedAt = new Date().valueOf();
        requestAnimationFrame(this.loop);
    };

    loop = () => {
        const current = new Date().valueOf();

        if (this.props.play) {
            this.time = current - this.mountedAt;
            const currentStep = Math.ceil(this.time / this.props.stepLength);

            this.setState({ step: Math.min(currentStep, this.state.maxSteps) });
        } else {
            this.mountedAt = current - this.time;
        }

        requestAnimationFrame(this.loop);
    };

    render = () => {
        const { children, stepLength, ...props } = this.props;
        return Array(this.state.step)
            .fill(0)
            .map((o, i) => cloneElement(children[i], { key: i, ...props }));
    };
}

Stack.propTypes = {
    play: PropTypes.bool,
    stepLength: PropTypes.number,
    children: PropTypes.node
};

Stack.defaultProps = {
    stepLength: 1000
};

export default Stack;
