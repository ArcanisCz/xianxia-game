module.exports = ({
                    react = false,
                    methodOrder = false,
                    mobx = false,
                    tsProject = undefined,
                  } = {}) => ({
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    // https://github.com/eslint/eslint/issues/11553#issuecomment-476570950
    globalThis: false,
  },
  // Must use the TypeScript parser for ESlint.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
    project: tsProject,
  },
  ignorePatterns: ['*.d.ts', '.eslintrc.js', '.eslintrc.cjs', '**/dist/*'],
  settings: {
    react: react
      ? {
        pragma: 'React',
        version: 'detect',
      }
      : undefined,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/ignore': ['react-native'],
  },
  plugins: [
    'prettier',
    'import',
    ...(react ? ['react', 'react-hooks'] : []),
    ...(mobx ? ['mobx'] : []),
  ],
  extends: [
    'eslint:recommended',
    ...(react ? ['plugin:react/recommended'] : []),
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:node/recommended',
    'plugin:import/typescript',
    // Somehow this enables recommended rules for ESLint and TypeScript, and
    // then removes those that are just about code format (since prettier will
    // manage it on file save).
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    ...(mobx ? ['plugin:mobx/recommended'] : []),
  ],
  rules: {
    'prettier/prettier': 'error',
    curly: 'error',
    eqeqeq: ['warn', 'always', {null: 'ignore'}],
    'no-console': 'error',
    'no-empty': 'off',
    'no-empty-pattern': 'off',
    'no-lone-blocks': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-unreachable': 'error',
    'no-process-exit': 'off',
    'node/no-process-env': 'error',
    'node/no-extraneous-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/shebang': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': [
      'error',
      {allow: ['data', 'error', 'event']},
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    ...(react
      ? {
        'react/prop-types': 'off',
        'react/no-unused-prop-types': ['error'],
        'react/no-unused-state': ['error'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        // New JSX transform does not need React in scope
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-boolean-value': ['error', 'always'],
      }
      : {}),
    // setImmediate() doesn't work properly on Windows in Electron during meet.
    'no-restricted-globals': react ? ['error', 'setImmediate'] : ['error'],
    // Typescript is already taking charge of theese two.
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['**/../libs/**'],
      },
    ],
    // Require line break at the end of the file.
    'eol-last': 'error',
    // Don't allow more than one empty line.
    'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 0, maxBOF: 0}],
    // Blank lines before returns and after const/let/var.
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: '*', next: 'return'},
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {blankLine: 'always', prev: ['import'], next: '*'},
      {blankLine: 'any', prev: ['import'], next: ['import']},
    ],
    // Ordering of imports: system, npm, our shared, app-core, ../../, ./
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'parent'],
        pathGroups: [
          {
            pattern: 'validators',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'shared',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'shared/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'rnnoise',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'app-core',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'app-core/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    ...(methodOrder
      ? {
        '@typescript-eslint/member-ordering': [
          'error',
          {
            classes: [
              'public-static-method',
              'private-static-method',
              'public-constructor',
              'private-constructor',
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
            ],
          },
        ],
      }
      : {}),
    // We should use "TODO: xxx" instead of "TODO xxx".
    'no-warning-comments': ['error', {terms: ['todo ']}],
    // TODO: tomas.jilek Too many false positives (objects, enums, html headers payloads, ...).
    // "@typescript-eslint/naming-convention": [
    //   "error",
    //   { "selector": "property", "format": ["camelCase"] },
    // ]
    ...(mobx
      ? {
        'mobx/missing-observer': 'off',
        'mobx/no-anonymous-observer': 'off',
      }
      : {}),
  },
});
