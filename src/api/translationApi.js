function getTranslations() {
    return import(/* webpackChunkName: "en" */ `translations/en.yml`).then((mod) => mod.default);
}

export default {
    getTranslations,
};
