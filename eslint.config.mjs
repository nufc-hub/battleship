import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals
        ...globals.jest, // Include Jest globals
        ...globals.browser, // Include Browser globals (this will add `document`, `window`, etc.)
      },
    },
  },
  pluginJs.configs.recommended,
];
