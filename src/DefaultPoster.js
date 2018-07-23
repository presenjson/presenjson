import React from 'react';
import PropTypes from 'prop-types';
import Scene from './Scene';
import Style from './Style';
import Image from './Image';

const DefaultPoster = (props) => <Scene>
        <Style fullscreen>
            <Image src={props.src} />
        </Style>
    </Scene>;

DefaultPoster.propTypes = {
    src: PropTypes.string
}

export default DefaultPoster;