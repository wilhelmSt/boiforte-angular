// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-plugin-prettier');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    ignores: ['projects/**/*', '*.js'],
    plugins: {
      prettier: prettier,
    },
    // @ts-ignore
    parserOptions: {
      project: ['./tsconfig.json'],
      createDefaultProgram: true,
    },
    settings: {},
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],

      // TypeScript
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'no-public' },
        },
      ],

      // Gerais
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
      ],

      // Prettier
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          bracketSpacing: true,
          arrowParens: 'always',
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angular.templateParser,
    },
    plugins: {
      prettier: prettier,
    },
    processor: null,
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-trailing-commas': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          printWidth: 120,
          trailingComma: 'es5',
          tabWidth: 2,
          useTabs: false,
          bracketSameLine: false,
        },
      ],
    },
  }
);
