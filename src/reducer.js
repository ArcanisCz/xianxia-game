import {combineReducers} from 'redux';

import {reducers} from './core';

export default combineReducers({
    ...reducers,
});
