import React from 'react';

import data from './data.json';
import PresenJson from '../src/PresenJson';
import Clip from '../src/Clip';
import Track from '../src/Track';
import Scene from '../src/Scene';
import Audio from '../src/Audio';
import Image from '../src/Image';
import Video from '../src/Video';
import Style from '../src/Style';
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
            <Style blur fullscreen>
                <Animated fadeOut delay='3s'>
                    <Video play={props.onScreen && !props.paused} src='video.mp4' volume={0} />
                </Animated>
            </Style>
            <Animated approach fadeInOut>
                <Image src='hc_logo_anim.svg' aspectRatio='4:3' style={style} />
                <Image src={data.cruiseline.logo} style={style} />
            </Animated>
            <Audio play={props.onScreen && !props.paused} src={`horn.mp3#t=1`} />
        </Scene>
    );
}

const Scene1 = (props) => {
    return (
        <Scene>
            <Image fullscreen src={`${props.pic}.jpg`} />
            <Audio play={props.onScreen && !props.paused} src={`croud.mp3#t=${props.offset}`} volume={props.horn && 0.5 || 1} />
            {props.horn && <Audio play={props.onScreen && !props.paused} src={`horn.mp3#t=2`} />}
        </Scene>
    );
}

const Scene2 = (props) => {
    return (
        <Scene>
            <Video play={props.onScreen && !props.paused} fullscreen src='video.mp4' />
        </Scene>
    );
}

const Poster = (props) => {
    return (
        <h1>{props.data.name}</h1>
    );
}

export default () => {
    return (
        <PresenJson debug poster={Poster} data={data}>
            <Track>
                <Clip length={50000} component={Start} />
                <Clip length={20000} component={Scene2} />
            </Track>
        </PresenJson>
    );
}
