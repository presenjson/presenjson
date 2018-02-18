import React from 'react';
import { shallow } from 'enzyme';
import Image from '../src/Image';

describe('Image', () => {
    it('renders correctly', () => {
        const image = shallow(
            <Image
                src="/some/src"
                style={{ margin: 10 }}
                some="prop"
                className="test-class"
            />
        );
        expect(image).toMatchSnapshot();
    });
});
