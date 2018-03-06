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
import RouteMap from '../src/RouteMap';
import Animated from '../src/Animated';

const Title = (props) => <div style={{
        color: 'yellow',
        opacity: .8,
        position: 'absolute',
        margin: '20px',
        top: 0,
        textAlign: 'right',
        right: 0,
        fontWeight: 'bold',
        fontSize: '136px',
        wordSpacing: '100vw'
    }}>
    {props.title}
</div>;

const Start = (props) => {
    return (
        <Scene dark>
            <Animated fadeIn='7s ease-in-out' hueRotate>
                <Title title={props.data.title}></Title>
                <Style fullscreen>
                    <Video play={props.play} src={props.data.destination.video} volume={0} onLoad={props.onLoad} />
                </Style>
            </Animated>
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
            <Animated hueRotate count='Infinite'>
                <Style fullscreen blur>
                    <Image src={props.data.mainImage} />
                </Style>
                <Title title={props.data.title}></Title>
            </Animated>
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

const DayTitle = (props) => <Scene><Animated approach>Day {props.data.day}</Animated></Scene>;
const TheMap = (props) => {
    return (
        <Scene light>
            <RouteMap routeGeoJson={props.data.routeGeoJson} {...props} />
        </Scene>
    );
};

const Section = ({ onLoad, play, groupData }) => {
    return (
        <PresenJson poster={Poster} data={groupData} onLoad={onLoad} play={play}>
            <Track>
                <Clip length={1000} component={DayTitle} />
                <Clip length={2000} component={TheMap} />
            </Track>
        </PresenJson>
    );
};


const X = ({ onLoad }) => {
    return (
        <PresenJson poster={Poster} data={example} onLoad={onLoad}>
            <Track>
                <Clip component={Start} delay={1000} />

                <ClipGroup map={example.sections} component={Section} />
                <Clip length={3600} component={Start} />
                <Clip length={2000} component={Intro} />
            </Track>
            <Track>
                <Clip component={Audio} src='SunriseOnMars.mp3' />
            </Track>
        </PresenJson>
    );
};

export default X;
