module.exports = {
    env: {
      node: true,
      es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    rules: {
      // Enforce consistent indentation of 2 spaces
      "indent": ["error", 2],
      
      // Enforce the use of single quotes for strings
      "quotes": ["error", "single"],
      
      // Require semicolons at the end of statements
      "semi": ["error", "always"],
      
      // Disallow the use of console
      "no-console": "warn",
      
      // Disallow unused variables
      "no-unused-vars": ["error", { "args": "none" }],
      
      // Enforce consistent linebreak style (Unix)
      "linebreak-style": ["error", "unix"],
      
      // Enforce consistent spacing inside braces
      "object-curly-spacing": ["error", "always"],
      
      // Require or disallow trailing commas
      "comma-dangle": ["error", "always-multiline"],
      
      // Enforce consistent spacing before function parentheses
      "space-before-function-paren": ["error", "never"]
    }
  };
  