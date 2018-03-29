import i18n from './i18n';
import log from './log';
import init from './init';

export default [
    i18n,
    log,
    init,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
