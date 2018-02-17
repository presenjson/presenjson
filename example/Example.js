import React from 'react';

import example from './example.json';
import PresenJson from '../src/PresenJson';
import Clip from '../src/Clip';
import ClipGroup from '../src/ClipGroup';
import Track from '../src/Track';
import Scene from '../src/Scene';
import Audio from '../src/Audio';
import Image from '../src/Image';
import Video from '../src/Video';
import Style from '../src/Style';
import Stack from '../src/Stack';
import RouteMap from '../src/RouteMap';
import Animated from '../src/Animated';

const Start = (props) => {
    const style = {
        width: 250,
        height: 100,
        margin: 10
    };

    return (
        <Scene light>
            <Animated fadeOut delay="1s">
                <Style blur fullscreen>
                    <Video play={props.play} src="video.mp4" volume={0} />
                </Style>
                <Animated approach>
                    <Image src="hc_logo_anim.svg" style={style} />
                    <Image src={data.cruiseline.logo} style={style} />
                </Animated>
            </Animated>
            <Audio play={props.play} src={`horn.mp3?#t=1`} />
        </Scene>
    );
};

const Background = (props) => {
    return (
        <Audio
            play={props.play}
            onLoad={props.onLoad}
            src="https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3"
        />
    );
};

const Intro2 = (props) => {
    console.log(props);

    return (
        <Scene light>
            <h2>„{props.data.name}“</h2>
            <h4>
                {props.data.duration} Tage {props.data.destination.name}
            </h4>
        </Scene>
    );
};
const Intro = (props) => {
    return (
        <Scene light>
            <Animated approach>
                <h1>SOMMER 2018</h1>
            </Animated>
        </Scene>
    );
};

const Poster = (props) => {
    return (
        <Scene>
            <Style fullscreen blur>
                <Image src={props.data.mainImage} />
            </Style>
            <h4>{props.data.title}</h4>
        </Scene>
    );
};

const Itinerary = (props) => {
    return (
        <Scene light>
            Tag {props.day} in {props.itinerary[0].portName}
        </Scene>
    );
};

const Y = ({ onLoad, play }) => {
    return (
        <PresenJson poster={Poster} data={example} onLoad={onLoad} play={play}>
            <Track>
                <Clip length={3600} component={Start} />
                <Clip length={2000} component={Intro} />
                <Clip length={2000} component={Intro2} />
            </Track>
        </PresenJson>
    );
};

const TheMap = (props) => {
    return (
        <Scene light>
            <RouteMap routeGeoJson={route} {...props} />
        </Scene>
    );
};

const X = ({ onLoad }) => {
    return (
        <PresenJson poster={Poster} data={example} onLoad={onLoad}>
            <Track solo>
                <Clip component={Background} />
                <Clip length={3600} component={Start} />
                <Clip length={2000} component={Intro} />
                <Clip component={Y} />
            </Track>
            <Track>
                <Clip length={120000} component={TheMap} />
            </Track>
            <Track>
                <Clip length={3600} component={Start} />
                <Clip length={2000} component={Intro} />
                <Clip length={2000} component={Intro2} />
                <ClipGroup
                    map={example.itinerary}
                    component={Itinerary}
                    length={1000}
                />
            </Track>
        </PresenJson>
    );
};

export default X;
