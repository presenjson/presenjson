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

// const Background = (props) => {
//     return (
//         <Audio
//             play={props.play}
//             onLoad={props.onLoad}
//             src="https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3"
//         />
//     );
// };

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

const BigText = (props) => <Scene transparent>
    <Animated approach>
        <h1 style={{ color: props.color }}>{props.title}</h1>
    </Animated>
</Scene>;

const Chopper = (props) => (
    <Scene transparent>
        <Audio src='chopper.mp3#t=20' play={props.play} />
        <div id='chopper'>
            <div id='left' />
            <div id='right' />
        </div>
    </Scene>
);

const Background = () => (
    <Scene light>
        <div className='bg' />
    </Scene>
);

const LENGTH = 20000;
const Presentation = () => (
    <PresenJson>
        <Track>
            <Clip length={LENGTH} component={Background} />
        </Track>
        <Track>
            <Clip component={BigText} length={1000} title='THIS' color='#105de0' />
            <Clip component={BigText} length={1000} title='IS' color='#36db94' />
            <Clip component={BigText} length={500} title='NOT' color='#000820' />
            <Clip component={BigText} length={500} title='REALLY' color='#A61D55' />
            <Clip component={BigText} length={500} title='A' color='rgb(0, 132, 137)' />
            <Clip component={BigText} length={10000} title='VIDEO' color='#fb5879' />
        </Track>
        <Track>
            <Clip component={Chopper} length={LENGTH} />
        </Track>
    </PresenJson>
);

export default Presentation;
