module.exports = {
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true
  },
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss"
    }
  ]
}