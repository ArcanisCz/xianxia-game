import {combineReducers} from 'redux-immutable';

import {reducers} from './core';
import game from './game';

export default combineReducers({
    ...reducers,
    [game.NAME]: game.reducer,
});
