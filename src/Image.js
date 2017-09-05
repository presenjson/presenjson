import React from 'react';

export default (props) => {
    const style = {
        backgroundImage: `url('${props.src}')`
    };

    return (
        <div className={`img ${props.fullScreen && 'fullscreen'}`} style={style} />
    );
}
