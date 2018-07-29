module.exports = {
  "extends": [ "google" ],
  "rules": {
    "comma-dangle": 0,
    "arrow-parens": 0,
    "indent": ["error", 4],
    "max-len": ["error", { "code": 120 }],
    "new-cap": ["error", { "properties": false }]
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  }
};