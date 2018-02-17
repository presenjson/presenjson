import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as R from 'ramda';

export const getLength = R.curry(
    (data, child) =>
        new Promise((resolve) => {
            if (child.props.length) {
                return resolve(child.props.length);
            }

            const Component = child.props.component;
            const onLoad = (length) => resolve(length);

            ReactDOMServer.renderToString(
                <Component {...child.props} data={data} onLoad={onLoad} />
            );
        })
);

export const getLengthsAndPositions = async (components, data) => {
    let pos = 0;
    const position = (delay, length) => {
        const clipStarts = pos + delay;
        pos += length;
        return clipStarts;
    };
    const lengths = await Promise.all(components.map(getLength(data)));

    return components.map((c, i) => ({
        delay: c.props.delay,
        length: lengths[i],
        fullLength: lengths[i] + c.props.delay,
        position: position(c.props.delay, lengths[i])
    }));
};

export default (children, data) =>
    new Promise(async (resolve) => {
        const allLengths = await getLengthsAndPositions(children, data);
        const length = allLengths.reduce((a, b) => a + b.fullLength, 0);

        const numOfBuckets = Math.ceil(length / 1000) + 1;
        const bucks = Array(numOfBuckets).fill([], 0, numOfBuckets);

        allLengths.forEach((c, i) => {
            const { length, position } = c;

            if (position % 1000 + length >= 1000) {
                const lastBucket = Math.floor((position + length) / 1000);
                bucks[lastBucket] = [...bucks[lastBucket], i];
            }

            for (let k = position; k < length + position; k += 1000) {
                const b = Math.floor(k / 1000);
                bucks[b] = [...bucks[b], i];
            }
        });

        const buckets = R.map(R.uniq, bucks); // duplicate entries?

        return resolve({
            buckets,
            length,
            positions: R.pluck('position', allLengths),
            lengths: R.pluck('length', allLengths)
        });
    });
