import resources from './resources';
import time from './time';

export default [
    resources,
    time,
].map((x) => x.saga);
