module.exports = {
  extends: 'universe/native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        endOfLine: 'auto',
        jsxSingleQuote: true,
      },
    ],
  },
};
