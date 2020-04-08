module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "max-len": [1, 120, 2, {"ignoreComments": true}],
        "quotes": [1, "single", { "allowTemplateLiterals": true }],
        "indent": ["error", 4],
        "new-cap": ["error", { "capIsNew": false }]
    }
};
