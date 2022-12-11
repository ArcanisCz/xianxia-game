const makeEslintConfig = require('./eslint.js');

module.exports = {
  ...makeEslintConfig({
    react: true,
    methodOrder: true,
    mobx: true,
    tsProject: "./tsconfig.json"
  }),
  overrides: [
  ],
};
