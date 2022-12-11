import {reducers} from './core';
import {app} from './core/util';

export default app.combineReducers({
    ...reducers,
}, true);
