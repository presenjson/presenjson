import React from 'react';

import data from './data.json';
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
import Animated from '../src/Animated';

console.log(data);

const Start = (props) => {
    const style = {
        width: 250,
        height: 100,
        margin: 10
    };

    return (
        <Scene light>
            <Animated fadeOut delay='1s'>
                <Style blur fullscreen>
                    <Video play={props.play} src='video.mp4' volume={0} />
                </Style>
                <Animated approach>
                    <Image src='hc_logo_anim.svg' style={style} />
                    <Image src={data.cruiseline.logo} style={style} />
                </Animated>
            </Animated>
            <Audio play={props.play} src={`horn.mp3?#t=1`} />
        </Scene>
    );
}

const Background = (props) => {
    return (
        <Audio play={props.play} src={`bensound-clapandyell.mp3`} />
    );
}

const Intro2 = (props) => {
    console.log(props)

    return (
    <Scene light>
        <h2>„{props.data.name}“</h2>
        <h4>{props.data.duration} Tage {props.data.destination.name}</h4>
    </Scene>);
}
const Intro = (props) => {
    return <Scene light>
            <Animated approach>
                <h1>SOMMER 2018</h1>
            </Animated>
    </Scene>;
}

const Poster = (props) => {
    return (
        <Scene>
            <Style fullscreen blur>
                <Image src={props.data.ship.picture} />
            </Style>
            <h4>{props.data.name}</h4>
        </Scene>
    );
};

const Itinerary = (props) => {
    return (
        <Scene light>
            Tag {props.day} in {props.itinerary[0].portName}
        </Scene>
    );
}

const Cabins = (props) => {
    return (
        <Scene>
            <Stack play={props.play} stepLength={400}>
                <Audio src='i1.ogg' />
                <Audio src='i2.ogg' />
                <Audio src='i3.ogg' />
                <Audio src='i4.ogg' />
            </Stack>
        </Scene>
    );
}

export default () => {
    return (
        <PresenJson poster={Poster} data={data} >
            <Track solo>
                <Clip component={Cabins} length={20000} />
            </Track>
            <Track>
                <Clip delay={2500} length={120000} component={Background} />
            </Track>
            <Track>
                <Clip length={3600} component={Start} />
                <Clip length={2000} component={Intro} />
                <Clip length={2000} component={Intro2} />
                <ClipGroup map={data.itinerary} component={Itinerary} length={1000} />
            </Track>
        </PresenJson>
    );
}
