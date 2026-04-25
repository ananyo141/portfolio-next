import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-console": ["warn", { allow: ["error"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.min.js",
      "*.min.css",
    ],
  },
];

export default eslintConfig;
