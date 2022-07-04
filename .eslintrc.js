module.exports = {
  env: {
    node: true,
    es6: true,
    // 编译器宏
    'vue/setup-compiler-macros': true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      // 启用 JSX
      jsx: true
    }
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', '@typescript-eslint'],
  // 0:忽略 , 1: 警告, 2: 报错
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-extra-semi': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'prettier/prettier': [
      2,
      {
        printWidth: 110,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        bracketSpacing: true,
        trailingComma: 'none',
        semi: false,
        arrowParens: 'avoid',
        endOfLine: 'auto',
        jsxSingleQuote: false,
        overrides: [
          {
            files: '*.html',
            options: {
              parser: 'html'
            }
          }
        ]
      }
    ],
    'no-case-declarations': 0,
    'no-unused-vars': 0,
    'prefer-const': 0,
    'no-extra-semi': 0,
    'no-unreachable': 1,
    'no-multiple-empty-lines': [1, { max: 1 }],
    'vue/multi-word-component-names': 0,
    'vue/valid-v-for': 1,
    'vue/no-setup-props-destructure': 0,
    // 标签自闭和
    'vue/html-self-closing': [
      1,
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    // 组件名规范
    'vue/component-name-in-template-casing': [
      2,
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['/^n-/', '/^icon-/']
      }
    ],
    // 标签格式化规则
    'vue/first-attribute-linebreak': [
      2,
      {
        singleline: 'beside',
        multiline: 'below'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 0
      }
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 0
      }
    }
  ]
}
