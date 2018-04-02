import defaultTheme from "./theme";

export const getClasses = (styles) => {
    const reduceClasses = (prev, curr) => Object.assign({}, prev, {[curr]: curr});
    return Object.keys(styles(defaultTheme)).reduce(reduceClasses, {});
};
