import i18n from './i18n';
import init from './init';

export default [
    i18n,
    init,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
