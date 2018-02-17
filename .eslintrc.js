module.exports = {
    parser: "babel-eslint",
  extends: [
      "eslint:recommended",
      'plugin:react/recommended',
      'airbnb-base',
      'prettier'
  ],
  rules: {
      "react/display-name": 0,
      "no-return-assign": 0,
      "import/prefer-default-export": 0,
      "consistent-return": 0,
      "no-shadow": 0
  },
  env: {
    "browser": true,
    "node": true
},
overrides: [
    {
      files: 'test/**/*.js',
      env: {
        jest: true,
      },
    },
  ],
}
