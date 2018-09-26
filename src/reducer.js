import {combineReducers} from 'redux';

import coreReducers from './core/reducers';
import game from './game';

export default combineReducers({
    ...coreReducers,
    [game.NAME]: game.reducer,
});
