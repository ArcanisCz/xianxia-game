// import pokus from './pokus';

export default [
    // pokus,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
