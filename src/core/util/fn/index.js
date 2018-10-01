export default {
    noop: () => {},
    identity: (item) => item,
    ensureRange: (value, min, max) => Math.min(Math.max(value, min), max),
};
