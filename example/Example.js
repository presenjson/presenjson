import React from 'react';

import data from './data.json';
import route from './route.json';
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


import { getLength } from '../src/utils/buckets';

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
            <Animated blur delay='1s'>
                <Style fullscreen>
                    <iframe src='file:///Users/jduncan/dev/startpage/index.html'></iframe>
                </Style>
            </Animated>
            <Stack play={props.play} stepLength={400}>
                <Audio src='' />
                <Audio src='' />
                <Audio src='' />
                <Audio src='i1.ogg#t=0.1' />
                <Audio src='i2.ogg#t=0.3' />
                <Audio src='i3.ogg#t=0.35' />
                <Audio src='i4.ogg#t=0.13' />
            </Stack>
            <div className='cabin-wrap'>
                <Stack play={props.play} stepLength={400}>
                    <Audio src='' />
                    <Audio src='' />
                    <Audio src='' />
                    <Animated land className='cabin'>
                        <h3>DO IT</h3>
                        <div className='price'>ab 259 €</div>
                        <span>Innenkabine pro Person</span>
                    </Animated>
                    <Animated land className='cabin'>
                        <h3>SEE IT</h3>
                        <div className='price'>ab 379 €</div>
                        <span>Außenkabine  pro Person</span>
                    </Animated>
                    <Animated land className='cabin'>
                        <h3>FEEL IT</h3>
                        <div className='price'>ab 829 €</div>
                        <span>Balkonkabine pro Person</span>
                    </Animated>
                    <Animated land className='cabin'>
                        <h3>LIVE IT</h3>
                        <div className='price'>ab 3.259 €</div>
                        <span>Suite pro Person</span>
                    </Animated>
                </Stack>
            </div>
        </Scene>
    );
}

const Y = ({ onLoad, play }) => {
    return (
        <PresenJson poster={Poster} data={data} onLoad={onLoad} play={play}>
            <Track>
                <Clip length={3600} component={Start} />
                <Clip length={2000} component={Intro} />
                <Clip length={2000} component={Intro2} />
            </Track>
        </PresenJson>
    );
}

const TheMap = (props) => {
    return (
        <Scene light>
            <RouteMap routeGeoJson={route} {...props} />
        </Scene>
    );
}

const X = ({ onLoad }) => {
    return (
        <PresenJson poster={Poster} data={data} onLoad={onLoad}>
            <Track>
                <Clip component={Cabins} length={2000} />
                <Clip component={Y} />
                <Clip length={120000} component={Background} />
            </Track>
            <Track solo>
                <Clip length={120000} component={TheMap} />
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

export default X;
