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

const Intro = (props) => {
    return <h1>SOMMER 2018</h1>;
}

const Poster = (props) => <h1>{props.data.name}</h1>;

export default () => {
    return (
        <PresenJson poster={Poster} data={data}>
            <Track>
                <Clip delay={2500} length={120000} component={Background} />
            </Track>
            <Track>
                <Clip length={3600} component={Start} />
                <Clip length={5000} component={Intro} />
            </Track>
        </PresenJson>
    );
}
