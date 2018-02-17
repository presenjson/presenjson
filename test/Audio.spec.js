import React from 'react';
import { shallow } from 'enzyme';
import Audio from '../src/Audio';

describe('Audio', () => {
    it('should render', () => {
        expect(shallow(<Audio src="test.mp3" />)).toMatchSnapshot();
    });
});
