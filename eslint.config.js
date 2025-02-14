import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node,
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': ts,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal'],
                        ['sibling', 'parent'],
                        ['index'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
    },
];
