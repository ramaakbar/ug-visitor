module.exports = {
  extends: 'universe/native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        endOfLine: 'auto',
        jsxSingleQuote: true,
      },
    ],
  },
};
