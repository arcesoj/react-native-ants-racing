module.exports = {
  root: true,
  "plugins": [
    "react",
    "react-native"
  ],
  "parser": "babel-eslint",
  "rules": {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-raw-text": 2,
    "indent": ["error", 2, { "SwitchCase": 1 }],
  },
  "env": {
    "react-native/react-native": true
  },
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    }
}
};
