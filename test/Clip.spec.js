import React from 'react';
import { shallow } from 'enzyme';
import Clip from '../src/Clip';

describe('Clip', () => {
    it('renders nothing', () => {
        expect(
            shallow(
                <Clip>
                    <div className="test" />
                </Clip>
            )
        ).toMatchSnapshot();
    });
    it('sets default props', () => {
        expect(Clip.defaultProps).toEqual({ length: 0, delay: 0 });
    });
});
