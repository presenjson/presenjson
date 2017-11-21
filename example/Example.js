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
            <Animated fadeOut delay='3s'>
                <Style blur fullscreen>
                    <Video play={props.play} src='video.mp4' volume={0} />
                </Style>
            </Animated>
            <Animated approach fadeInOut>
                <Image src='hc_logo_anim.svg' style={style} />
                <Image src={data.cruiseline.logo} style={style} />
            </Animated>
            <Audio play={props.play} src={`horn.mp3#t=1`} />
        </Scene>
    );
}

const Poster = (props) => <h1>{props.data.name}</h1>;

export default () => {
    return (
        <PresenJson poster={Poster} data={data}>
            <Track>
                <Clip length={50000} component={Start} />
            </Track>
        </PresenJson>
    );
}
