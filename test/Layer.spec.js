import React from 'react';
import { shallow } from 'enzyme';
import Layer from '../src/Layer';
import Clip from '../src/Clip';
import * as buckets from '../src/utils/buckets';
import * as flattenClips from '../src/utils/flattenClips';

describe('Layer', () => {
    it('constructor sets default state/vars and calls load', () => {
        const loadClips = jest
            .spyOn(Layer.prototype, 'loadClips')
            .mockImplementation(() => {});

        const layer = new Layer({ startAt: 100, children: 'the-children' });

        expect(layer.time).toBe(100);
        expect(layer.mountedAt).toBe(0);
        expect(layer.state).toEqual({ bucket: 0, onScreen: [], buckets: [] });
        expect(loadClips).toHaveBeenCalled();
    });
    describe('load', () => {
        it('calls onLoad with length and sets state', async () => {
            const state = {
                length: 12345,
                other: 'state'
            };
            const setState = jest
                .spyOn(Layer.prototype, 'setState')
                .mockImplementation(() => {});
            const bucketSpy = jest
                .spyOn(buckets, 'default')
                .mockReturnValue(Promise.resolve(state));
            const flattenClipsSpy = jest
                .spyOn(flattenClips, 'default')
                .mockReturnValue('the-clips');

            const onLoad = jest.fn();
            const Component = () => false;
            const children = [<Component length={1000} key={1} />];

            const layer = new Layer({
                startAt: 100,
                children,
                onLoad,
                data: 'the-data'
            });

            await layer.loadClips();

            expect(onLoad).toHaveBeenCalledWith(12345);
            expect(setState).toHaveBeenCalledWith(state);
            expect(bucketSpy).toHaveBeenCalledWith('the-clips', 'the-data');
            expect(flattenClipsSpy).toHaveBeenCalledWith(children);
            expect(layer.clips).toEqual('the-clips');
        });
    });
    describe('componentDidMount', () => {
        it('sets mountedAt and starts animation loop', () => {
            jest.spyOn(Date, 'now').mockReturnValue(123456789);
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});
            jest
                .spyOn(Layer.prototype, 'loadClips')
                .mockImplementation(() => {});

            const layer = new Layer({});
            layer.loop = jest.fn();
            layer.componentDidMount();

            expect(layer.mountedAt).toBe(123456789);
            expect(global.requestAnimationFrame).toHaveBeenCalledWith(
                layer.loop
            );
        });
    });
    describe('isOnScreen', () => {
        it('checks if clip is currently on being displayed', () => {
            jest
                .spyOn(Layer.prototype, 'loadClips')
                .mockImplementation(() => {});
            const relativeTime = 2000;

            const layer = new Layer({});
            layer.state.lengths = [0, 0, 100, 300];
            layer.state.positions = [0, 0, 1950, 2100];
            layer.time = relativeTime;
            const is2OnScreen = layer.isOnScreen(2);
            const is3OnScreen = layer.isOnScreen(3);

            expect(is2OnScreen).toBeTruthy();
            expect(is3OnScreen).toBeFalsy();
        });
    });
    describe('loop', () => {
        it('calls requestAnimationFrame with itself', () => {
            jest
                .spyOn(Layer.prototype, 'loadClips')
                .mockImplementation(() => {});
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const layer = new Layer({});
            layer.setState = jest.fn();

            layer.loop();

            expect(requestAnimationFrame).toHaveBeenCalledWith(layer.loop);
        });
        it('sets mountedAt when paused', () => {
            jest.spyOn(Date, 'now').mockReturnValue(1000000);
            jest
                .spyOn(Layer.prototype, 'loadClips')
                .mockImplementation(() => {});
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const layer = new Layer({ paused: true });
            layer.mountedAt = 22222222;
            layer.time = 2000;

            layer.loop();

            expect(layer.mountedAt).toBe(998000);
        });
        it('sets current bucket and clip on screen', () => {
            jest.spyOn(Date, 'now').mockReturnValue(334444);
            jest
                .spyOn(Layer.prototype, 'loadClips')
                .mockImplementation(() => {});
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});
            const setState = jest
                .spyOn(Layer.prototype, 'setState')
                .mockImplementation(() => {});

            const layer = new Layer({ paused: false });
            const isOnScreen = jest
                .spyOn(layer, 'isOnScreen')
                .mockImplementation(() => true);
            layer.mountedAt = 333111;
            layer.state.buckets = [[], [3, 4, 5]];

            layer.loop();

            expect(layer.time).toBe(1333);
            expect(setState).toHaveBeenCalledWith({ bucket: 1, onScreen: 3 });
            expect(isOnScreen).toHaveBeenCalledWith(3, 0, [3, 4, 5]);
            expect(isOnScreen).toHaveBeenCalledWith(4, 1, [3, 4, 5]);
            expect(isOnScreen).toHaveBeenCalledWith(5, 2, [3, 4, 5]);
        });
    });
    describe('render', () => {
        it('renders correctly on empty bucket', () => {
            const layer = shallow(<Layer onLoad={() => {}} />);
            expect(layer).toMatchSnapshot();
        });
        it('renders correctly on active bucket', () => {
            const layer = shallow(
                <Layer onLoad={() => {}}>
                    <Clip length={1000} component="the-component" />
                    <Clip length={1000} component="the-component" />
                    <Clip length={500} component="the-component" />
                    <Clip length={500} component="the-component" />
                </Layer>
            );
            layer.setState({
                bucket: 1,
                buckets: [[], [2, 3]]
            });
            expect(layer).toMatchSnapshot();
        });
    });
});
