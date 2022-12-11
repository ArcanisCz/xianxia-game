import init from './init';
import game from './game';

export default [
    init,
    game,
].reduce((acc, item) => ({...acc, [item.NAME]: item.reducer}), {});
