import resources from './resources';
import actions from './actions';

export default [
    resources,
    actions,
].reduce((acc, item) => Object.assign({}, acc, {[item.NAME]: item.reducer}), {});
