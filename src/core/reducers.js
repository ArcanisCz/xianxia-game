import init from './init';

export default [
    init,
].reduce((acc, item) => ({...acc, [item.NAME]: item.reducer}), {});
