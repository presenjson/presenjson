import React from 'react';

const def = {
    approach: '7s ease-out',
    land: '5s cubic-bezier(0,1,.15,.84)',
    fadeInOut: '3s ease-in-out',
    fadeOut: '3s ease-in-out',
    blur: '3s ease-in-out'
};

export default ({
    children,
    className = '',
    fillMode = 'forwards',
    direction = 'normal',
    count = 'initial',
    delay = '0s',
    ...rest
}) => {
    const style = {
        animation: Object.entries(rest)
            .map(
                (o) => `${o[0]} ${(o[1] !== true && o[1]) || def[o[0]] || '0s'}`
            )
            .join(', '),
        animationFillMode: fillMode,
        animationDirection: direction,
        animationIterationCount: count,
        animationDelay: delay
    };
    return (
        <div className={`fx-container ${className}`} style={style}>
            {children}
        </div>
    );
};
