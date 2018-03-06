import {combineReducers} from 'redux-immutable';

import appReducers from './app/reducers';
import coreReducers from './core/reducers';

export default combineReducers({
    ...coreReducers,
    ...appReducers,
});
