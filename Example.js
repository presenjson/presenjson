import React from 'react';

import PresenJson from './src/PresenJson';
import Clip from './src/Clip';
import Track from './src/Track';
import Scene from './src/Scene';
import Audio from './src/Audio';
import Image from './src/Image';
import Video from './src/Video';

const Scene1 = (props) => {
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
            <Video play={props.onScreen && !props.paused} fullScreen src='video.mp4'/>
        </Scene>
    );
}

const Background = (props) => {
    return (
        <Scene>
            <h1>Hi</h1>
            <Audio play={props.onScreen && !props.paused} src='epic.mp3' />
        </Scene>
    );
}

export default () => {
    return (
        <PresenJson debug >
            <Track background>
                <Clip component={Background} length={30000} />
            </Track>
            <Track>
                <Clip length={20000} component={Scene2} />
            </Track>
        </PresenJson>
    );
}
