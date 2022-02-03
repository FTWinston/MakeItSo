module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "react-app",
        "react-app/jest",
        "plugin:react/jsx-runtime"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": ["./tsconfig.json"],
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "jsx-a11y",
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "functions": "never"
        }],
        "indent": ["error", 4],
        "key-spacing": ["error", { "afterColon": true }],
        "no-restricted-imports": ["warn", {
            "patterns": [{
                "group": [
                    "src/features/*/*",
                    "./features/*/*",
                    "../features/*/*",
                    "../../features/*/*",
                    "../../../features/*/*",
                ],
                "message": "If you need to import from another feature, export what you need from that feature's index file."
            }]
        }],
        "prefer-const": "warn",
        "react/jsx-wrap-multilines": ["warn", {
            "declaration": "parens-new-line",
            "assignment": "parens-new-line",
            "return": "parens-new-line",
            "arrow": "parens-new-line",
            "condition": "parens-new-line",
            "logical": "parens-new-line",
            "prop": "parens-new-line"
        }],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "@typescript-eslint/ban-types": ["off"],
        "@typescript-eslint/brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-floating-promises": ["off"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "keyword-spacing": ["error", { "before": true, "after": true }],
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "ignorePatterns": [
        ".eslintrc.js"
    ],
    "overrides": [
        {
          "files": [
            "**/*.stories.*"
          ],
          "rules": {
            "import/no-anonymous-default-export": "off",
            "no-restricted-imports": "off"
          }
        }
    ]
}
