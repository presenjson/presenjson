import React from 'react';
import { shallow } from 'enzyme';
import Animated from '../src/Animated';

describe('Animated', () => {
    it('renders correctly', () => {
        expect(
            shallow(
                <Animated>
                    <div className="test" />
                </Animated>
            )
        ).toMatchSnapshot();
    });
    it('sets animation name, fill-mode, delay, count', () => {
        const animated = shallow(
            <Animated
                testAnimation="30s"
                otherAnimation="20s"
                fillMode="foo"
                count="bar"
                delay="3s"
                direction="baz"
                className="the-class"
            />
        );
        expect(animated).toMatchSnapshot();
    });
    it('uses default animation lengths and easing functions for animations', () => {
        const animated = shallow(
            <Animated approach fadeInOut fadeOut blur land />
        );
        expect(animated).toMatchSnapshot();
    });
});
