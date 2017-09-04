import React from 'react';

import PresenJson from './src/PresenJson';
import Clip from './src/Clip';

export default () => {
    return (
        <PresenJson debug>
            {Array(1000).fill([], 0, 1000).map((o, i) => <Clip key={i} length={1000}><h1>{i}</h1></Clip>)}
            <Clip length={5000} ><h1>END</h1></Clip>
        </PresenJson>
    );
}
