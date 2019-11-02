import i18n from './i18n';
import init from './init';

export default [
    i18n,
    init,
].reduce((acc, item) => ({...acc, [item.NAME]: item.reducer}), {});
