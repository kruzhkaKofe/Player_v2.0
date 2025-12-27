export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-empty-ru': parsed => {
          return !parsed.subject
            ? [false, '❌ Ошибка: Вы забыли написать описание коммита!']
            : [true];
        },
        'type-empty-ru': parsed => {
          return !parsed.type
            ? [false, '❌ Ошибка: Не указан тип (fix, feat и т.д.) в начале!']
            : [true];
        },
      },
    },
  ],
  rules: {
    'subject-empty': [0],
    'type-empty': [0],

    'subject-empty-ru': [2, 'never'],
    'type-empty-ru': [2, 'never'],

    'type-enum': [
      2, // уровень ошибки (2 = error)
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
