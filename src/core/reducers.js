import resources from './resources';
import i18n from './i18n';

export default [
    resources,
    i18n,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
