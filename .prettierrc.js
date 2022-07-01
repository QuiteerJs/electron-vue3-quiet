module.exports = {
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
