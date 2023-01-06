module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    plugins: ["prettier"],
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        // '@vue/prettier/@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2021,
    },
    ignorePatterns: ["**/*.js.snap"],
    rules: {
        "prettier/prettier": "error",
        camelcase: [
            0,
            {
                properties: "never", // does not check property names
                ignoreDestructuring: true, // does not check destructured identifiers (but still checks any use of those identifiers later in the code)
                ignoreImports: true, // does not check ES2015 imports (but still checks any use of the imports later in the code except function arguments)
                ignoreGlobals: true, // does not enforce camelcase style for global variables
            },
        ],
        "@typescript-eslint/no-var-requires": 0,
        "vue/no-use-v-if-with-v-for": ["error"],
        "vue/attributes-order": [
            "error",
            {
                order: [
                    "DEFINITION",
                    "LIST_RENDERING",
                    "CONDITIONALS",
                    "RENDER_MODIFIERS",
                    "GLOBAL",
                    ["UNIQUE", "SLOT"],
                    "TWO_WAY_BINDING",
                    "OTHER_DIRECTIVES",
                    "OTHER_ATTR",
                    "CONTENT",
                    "EVENTS",
                ],
                alphabetical: false,
            },
        ],
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "any",
                    normal: "always",
                    component: "always",
                },
                svg: "always",
                math: "always",
            },
        ],
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-empty-function": 0,
        "no-useless-escape": 0,
        "no-prototype-builtins": 0,
        "vue/multi-word-component-names": 0,
    },
};
