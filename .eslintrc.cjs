module.exports = {
  extends: [
    'eslint:recommended',
    // TODO: Upgrade to "recommended-type-checked"
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'examples/', '*.d.ts'],
  // TODO: Remove these rules
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  root: true,
};