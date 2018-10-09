import React from 'react';
import { shallow } from 'enzyme';
import Sequence from '../src/Sequence';

describe('Sequence', () => {
    describe('componentDidMount', () => {
        it('triggers render loop, sets mountedAt', () => {
            jest.spyOn(Date, 'now').mockReturnValue(123456789);
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const sequence = new Sequence({ children: [] });
            sequence.componentDidMount();

            expect(sequence.mountedAt).toBe(123456789);
            expect(requestAnimationFrame).toHaveBeenCalledWith(sequence.loop);
        });
    });
    describe('loop', () => {
        it('sets current step according to stepLength and time', () => {
            jest.spyOn(Date, 'now').mockReturnValue(1000800);
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const sequence = new Sequence({
                play: true,
                children: [{}, {}, {}],
                stepLength: 400
            });
            sequence.mountedAt = 1000000;
            sequence.setState = jest.fn();
            sequence.loop();

            expect(sequence.setState).toHaveBeenCalledWith({ step: 2 });
        });
        it('sets doesnt go above given amount of steps', () => {
            jest.spyOn(Date, 'now').mockReturnValue(3000800);
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const sequence = new Sequence({
                play: true,
                children: [{}, {}, {}],
                stepLength: 400
            });
            sequence.mountedAt = 1000000;
            sequence.setState = jest.fn();
            sequence.loop();

            expect(sequence.setState).toHaveBeenCalledWith({ step: 3 });
        });
        it('calls requestAnimationFrame with itself', () => {
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const sequence = new Sequence({ children: [{}, {}, {}] });

            sequence.setState = jest.fn();
            sequence.loop();

            expect(requestAnimationFrame).toHaveBeenCalledWith(sequence.loop);
        });
        it('resets mountedAt when paused', () => {
            jest.spyOn(Date, 'now').mockReturnValue(9000000);
            jest
                .spyOn(global, 'requestAnimationFrame')
                .mockImplementation(() => {});

            const sequence = new Sequence({
                children: [{}, {}, {}],
                play: false
            });
            sequence.time = 1000000;
            sequence.loop();

            expect(sequence.mountedAt).toBe(8000000);
        });
    });
    it('renders nothing to begin with', () => {
        expect(
            shallow(
                <Sequence stepLength={400}>
                    <div className="test" />
                    <div className="test" />
                    <div className="test" />
                    <div className="test" />
                </Sequence>
            )
        ).toMatchSnapshot();
    });
    it('renders to steps', () => {
        const sequence = shallow(
            <Sequence stepLength={400}>
                <div className="test" />
                <div className="test" />
                <div className="test" />
                <div className="test" />
            </Sequence>
        );

        sequence.instance().setState({ step: 2 });

        expect(sequence).toMatchSnapshot();
    });
});
