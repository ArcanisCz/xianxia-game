import {combineReducers} from 'redux-immutable';

import coreReducers from './core/reducers';

export default combineReducers({
    ...coreReducers,
});
