import React from 'react';
import { shallow } from 'enzyme';
import Track from '../src/Track';

describe('Track', () => {
    it('renders nothing', () => {
        expect(
            shallow(
                <Track>
                    <div className="test" />
                </Track>
            )
        ).toMatchSnapshot();
    });
    it('sets default props', () => {
        expect(Track.defaultProps).toEqual({ solo: false });
    });
});
