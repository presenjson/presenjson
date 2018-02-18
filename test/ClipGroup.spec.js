import React from 'react';
import { shallow } from 'enzyme';
import ClipGroup, { Group } from '../src/ClipGroup';

describe('ClipGroup', () => {
    it('renders nothing', () => {
        expect(
            shallow(
                <ClipGroup>
                    <div className="test" />
                </ClipGroup>
            )
        ).toMatchSnapshot();
    });
    it('sets default props', () => {
        expect(ClipGroup.defaultProps).toEqual({ length: 0, delay: 0 });
    });
    describe('Group', () => {
        it('renders Clip array', () => {
            const Component = () => false;
            const array = [
                {
                    day: 1,
                    description: 'Foo'
                },
                {
                    day: 2,
                    description: 'bar'
                }
            ];
            const group = shallow(
                <Group
                    map={array}
                    some="prop"
                    component={Component}
                    length={1000}
                />
            );
            expect(group).toMatchSnapshot();
        });
    });
});
