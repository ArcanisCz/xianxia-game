import {combineReducers} from 'redux-immutable';

import appReducers from './app/reducers';
import coreReducers from './core/reducers';
import gameReducers from './game/reducers';

export default combineReducers({
    ...coreReducers,
    ...appReducers,
    ...gameReducers,
});
