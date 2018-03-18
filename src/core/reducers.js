import resources from './resources';
import i18n from './i18n';
import actions from './actions';

export default [
    resources,
    i18n,
    actions,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
