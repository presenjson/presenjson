import React from 'react';
import { shallow } from 'enzyme';
import Audio from '../src/Audio';

describe('Audio', () => {
    it('renders correctly', () => {
        expect(shallow(<Audio src="test.mp3" some="prop" />)).toMatchSnapshot();
    });
    describe('componentDidMount', () => {
        it('plays and sets volume on componentDidMount', () => {
            const component = new Audio({ play: true, volume: 1.453 });
            component.audio = {
                paused: true,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentDidMount();

            expect(component.audio.play).toHaveBeenCalled();
            expect(component.audio.pause).not.toHaveBeenCalled();
            expect(component.audio.volume).toBe(1.453);
        });
    });
    describe('componentWillReceiveProps', () => {
        it('plays if play is passed and audio is paused', () => {
            const component = new Audio({});
            component.audio = {
                paused: true,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ play: true });

            expect(component.audio.play).toHaveBeenCalled();
            expect(component.audio.pause).not.toHaveBeenCalled();
        });
        it('paused if play is false and audio is playing', () => {
            const component = new Audio({});
            component.audio = {
                paused: false,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ play: false });

            expect(component.audio.play).not.toHaveBeenCalled();
            expect(component.audio.pause).toHaveBeenCalled();
        });
        it('sets volume if volume has changed', () => {
            const component = new Audio({ volume: 1 });
            component.audio = {
                paused: false,
                play: jest.fn(),
                pause: jest.fn()
            };

            component.componentWillReceiveProps({ volume: 0.9 });

            expect(component.audio.volume).toBe(0.9);
        });
    });
    describe('constructor', () => {
        it('calls onLoad with duration of audio file when no length is set', () => {
            const audio = {
                duration: 30.3045
            };
            const onLoad = jest.fn();
            document.createElement = jest.fn().mockReturnValue(audio);

            new Audio({ src: '/some/src', onLoad }); // eslint-disable-line

            expect(audio.src).toBe('/some/src');

            audio.onloadedmetadata();

            expect(audio.src).toBe('');
            expect(onLoad).toHaveBeenCalledWith(30304.5);
        });
    });
});
