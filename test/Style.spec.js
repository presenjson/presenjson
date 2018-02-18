import React from 'react';
import { shallow } from 'enzyme';
import Style from '../src/Style';

describe('Style', () => {
    it('renders correctly', () => {
        expect(
            shallow(
                <Style blur fullscreen>
                    <div className="test" />
                </Style>
            )
        ).toMatchSnapshot();
    });
});
