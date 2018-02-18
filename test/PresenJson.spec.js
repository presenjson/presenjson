import React from 'react';
import { shallow } from 'enzyme';
import PresenJson from '../src/PresenJson';

describe('PresenJson', () => {
    it('renders poster', () => {
        const Poster = () => <div />;
        const presenjson = shallow(<PresenJson poster={Poster} />);
        expect(presenjson).toMatchSnapshot();
    });
    it('renders all layers', () => {
        const Track = () => false;
        const presenjson = shallow(
            <PresenJson startAt={1000} data="data">
                <Track some="prop">
                    <div />
                </Track>
                <Track other="prop">
                    <div />
                </Track>
            </PresenJson>
        );
        expect(presenjson).toMatchSnapshot();
    });
    it('renders only solo layers', () => {
        const Track = () => false;
        const presenjson = shallow(
            <PresenJson startAt={1000} data="data">
                <Track some="prop" solo>
                    <div />
                </Track>
                <Track other="prop">
                    <div />
                </Track>
            </PresenJson>
        );
        expect(presenjson).toMatchSnapshot();
    });
    describe('componentDidMount', () => {
        it('sets initial, paused state', () => {
            const presenJson = new PresenJson({});
            presenJson.setState = jest.fn();

            presenJson.componentDidMount();

            expect(presenJson.setState).toHaveBeenCalledWith({
                paused: true,
                initial: true
            });
        });
        it('sets initial, playing state when autoPlay is set', () => {
            const presenJson = new PresenJson({ autoPlay: true });
            presenJson.setState = jest.fn();

            presenJson.componentDidMount();

            expect(presenJson.setState).toHaveBeenCalledWith({
                paused: false,
                initial: true
            });
        });
        it('sets initial, playing state when play is set', () => {
            const presenJson = new PresenJson({ play: true });
            presenJson.setState = jest.fn();

            presenJson.componentDidMount();

            expect(presenJson.setState).toHaveBeenCalledWith({
                paused: false,
                initial: false
            });
        });
    });
    describe('componentWillReceiveProps', () => {
        it('pauses if props.play is false and changes', () => {
            const presenJson = new PresenJson({ play: false });
            presenJson.setState = jest.fn();

            presenJson.componentWillReceiveProps({ play: true });

            expect(presenJson.setState).toHaveBeenCalledWith({
                paused: false,
                initial: false
            });
        });
    });
    describe('togglePlayback', () => {
        it('toggles playback', () => {
            const presenJson = new PresenJson({ play: true });
            presenJson.setState = jest.fn();

            presenJson.togglePlayback();

            expect(presenJson.setState).toHaveBeenCalledWith({
                paused: true,
                initial: false
            });
        });
    });
    describe('onLoad', () => {
        it('triggers props onLoad with longest length when all rendered layers have called onLoad', () => {
            const onLoad = jest.fn();
            const presenJson = new PresenJson({ onLoad });
            presenJson.layersToRender = [{}, {}, {}];

            presenJson.onLoad(1000);
            expect(onLoad).not.toHaveBeenCalled();

            presenJson.onLoad(10000);
            expect(onLoad).not.toHaveBeenCalled();

            presenJson.onLoad(2000);
            expect(onLoad).toHaveBeenCalledWith(10000);
        });
    });
});
