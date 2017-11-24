import R from 'ramda';

const [ POSITION, LENGTH ] = [ 0, 1 ];
const fullLength = R.pipe(
    R.map((o) => o.props.length + o.props.delay),
    R.sum
);

export default (children) => {
    let pos = 0;
    const length = fullLength(children);
    const numOfBuckets = Math.ceil(length / 1000) + 1;
    const bucks = Array(numOfBuckets).fill([], 0, numOfBuckets );
    const lengths = R.map(R.path([ 'props', 'length' ]), children);

    const positions = R.map((child) => {
        const clipStarts = pos + child.props.delay;
        pos += child.props.length;
        return clipStarts;
    }, children);

    const f = R.zip(positions, lengths);
    f.forEach((c, i) => {
        const len = c[LENGTH];
        const start = c[POSITION];

        if ((start % 1000) + len >= 1000 ) {
            const lastBucket = Math.floor((start + len) / 1000);
            bucks[lastBucket] = [ ...bucks[lastBucket], i ];
        }

        for(let k = start; k < (len + start); k+=1000) {
            const b = Math.floor(k / 1000);
            bucks[b] = [ ...bucks[b], i ];
        }
    });

    const buckets = R.map(R.uniq, bucks); // duplicate entries?

    return { buckets, positions, lengths, length };
};
