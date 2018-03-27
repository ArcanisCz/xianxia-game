import resources from './resources';
import i18n from './i18n';
import actions from './actions';
import log from './log';
import init from './init';

export default [
    resources,
    i18n,
    actions,
    log,
    init,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
