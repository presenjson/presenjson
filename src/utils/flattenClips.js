import * as R from 'ramda';
import { Group } from '../ClipGroup';

export default R.pipe(
    R.of,
    R.flatten,
    R.map(R.when((x) => x.type.name === 'ClipGroup', (x) => Group(x.props))),
    R.flatten
);
