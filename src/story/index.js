const componentsContext = require.context("../components", true, /\.story\.js$/);
componentsContext.keys().reduce((memo, key) => Object.assign({}, memo, {[key]: componentsContext(key).default}), {});
