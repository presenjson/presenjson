import React from 'react';
import { shallow } from 'enzyme';
import Scene from '../src/Scene';

describe('Scene', () => {
    it('renders correctly', () => {
        expect(
            shallow(
                <Scene light>
                    <div className="test" />
                </Scene>
            )
        ).toMatchSnapshot();
    });
});
