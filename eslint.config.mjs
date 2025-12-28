// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // stylistic
    '@stylistic/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/array-element-newline': ['error', 'consistent'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/indent': [
      'error',
      2,
      {
        MemberExpression: 1,
        VariableDeclarator: 'first',
        SwitchCase: 1,
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 'first',
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true,
        ignoreComments: true,
      },
    ],
    '@stylistic/indent-binary-ops': ['error', 2],
    '@stylistic/max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    '@stylistic/multiline-ternary': ['error', 'always-multiline'],
    '@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    '@stylistic/object-curly-spacing': [
      'error',
      'always',
      {
        emptyObjects: 'never',
      },
    ],
    '@stylistic/object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
        catch: 'always',
      },
    ],
    '@stylistic/template-tag-spacing': ['error', 'always'],
    '@stylistic/type-generic-spacing': 'error',
    '@stylistic/type-named-tuple-spacing': 'error',
    '@stylistic/wrap-regex': 'error',
    '@stylistic/semi': ['error', 'always'],

    // typescript
    '@typescript-eslint/no-explicit-any': 'warn',

    // vue
    'vue/multi-word-component-names': ['off'],
  },
});
