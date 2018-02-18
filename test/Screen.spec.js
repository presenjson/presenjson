import React from 'react';
import { shallow } from 'enzyme';
import Screen from '../src/Screen';

describe('Screen', () => {
    it('renders correctly', () => {
        const Component = () => <div />;
        expect(
            shallow(<Screen component={Component} onScreen paused={false} />)
        ).toMatchSnapshot();
    });
    it('renders nothing if no component', () => {
        expect(shallow(<Screen onScreen paused={false} />)).toMatchSnapshot();
    });
});
