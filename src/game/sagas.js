import resources from './resources';
import time from './time';
import actions from './actions';

export default [
    resources,
    time,
    actions,
].map((x) => x.saga);
