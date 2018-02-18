import React from 'react';
import { shallow } from 'enzyme';
import Video from '../src/Video';

describe('Video', () => {
    it('renders correctly', () => {
        expect(shallow(<Video src="test.mp3" some="prop" />)).toMatchSnapshot();
    });
    describe('componentDidMount', () => {
        it('plays and sets volume, playbackRate on componentDidMount', () => {
            const component = new Video({
                play: true,
                volume: 1.453,
                playbackRate: 2
            });
            component.video = {
                paused: true,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentDidMount();

            expect(component.video.play).toHaveBeenCalled();
            expect(component.video.pause).not.toHaveBeenCalled();
            expect(component.video.volume).toBe(1.453);
            expect(component.video.playbackRate).toBe(2);
        });
    });
    describe('componentWillReceiveProps', () => {
        it('plays if play is passed and audio is paused', () => {
            const component = new Video({});
            component.video = {
                paused: true,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ play: true });

            expect(component.video.play).toHaveBeenCalled();
            expect(component.video.pause).not.toHaveBeenCalled();
        });
        it('paused if play is false and audio is playing', () => {
            const component = new Video({});
            component.video = {
                paused: false,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ play: false });

            expect(component.video.play).not.toHaveBeenCalled();
            expect(component.video.pause).toHaveBeenCalled();
        });
        it('sets volume if volume has changed', () => {
            const component = new Video({ volume: 1 });
            component.video = {
                paused: false,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ volume: 0.9 });

            expect(component.video.volume).toBe(0.9);
        });
        it('sets playbackRate if changed', () => {
            const component = new Video({ playbackRate: 3 });
            component.video = {
                paused: false,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ playbackRate: 1 });

            expect(component.video.playbackRate).toBe(1);
        });
    });
    describe('constructor', () => {
        it('calls onLoad with duration of audio file when no length is set', () => {
            const video = {
                duration: 30.3045
            };
            const onLoad = jest.fn();
            document.createElement = jest.fn().mockReturnValue(video);

            new Video({ src: '/some/src', onLoad }); // eslint-disable-line

            expect(video.src).toBe('/some/src');

            video.onloadedmetadata();

            expect(video.src).toBe('');
            expect(onLoad).toHaveBeenCalledWith(30304.5);
        });
    });
});
