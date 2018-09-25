import {combineReducers} from 'redux';

import coreReducers from './core/reducers';

export default combineReducers({
    ...coreReducers,
});
