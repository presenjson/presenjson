import React from 'react';

import PresenJson from './src/PresenJson';
import Clip from './src/Clip';
import Scene from './src/Scene';
import Audio from './src/Audio';
import Image from './src/Image';
import Video from './src/Video';


const Scene1 = (props) => {
    console.log(props);
    return (
        <Scene>
            <Image fullScreen src={`${props.pic}.jpg`} />
            <Audio play={props.onScreen && !props.paused} src={`croud.mp3#t=${props.offset}`} volume={props.horn && 0.5 || 1} />
            {props.horn && <Audio play={props.onScreen && !props.paused} src={`horn.mp3#t=2`} />}
        </Scene>
    );
}

const Scene2 = (props) => {
    return (
        <Scene>
            <Video play={props.onScreen} src={`http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4#t=${props.offset}`} />
        </Scene>
    );
}


export default () => {
    return (
        <PresenJson debug >
            <Clip length={150} component={Scene1} offset={121} pic={2} />
            <Clip length={200} />
            <Clip length={150} component={Scene1} offset={122} pic={1} />
            <Clip length={150} />
            <Clip length={150} component={Scene1} offset={123} pic={4} />
            <Clip length={100} />
            <Clip length={150} component={Scene1} offset={124} pic={5} />
            <Clip length={80} />
            <Clip length={150} component={Scene1} offset={125} pic={4} />
            <Clip length={60} />
            <Clip length={150} component={Scene1} offset={125} pic={1} />
            <Clip length={50} />
            <Clip length={20000} component={Scene1} offset={129} horn />
            <Clip length={20000} component={Scene2} offset={5} horn />
        </PresenJson>
    );
}
