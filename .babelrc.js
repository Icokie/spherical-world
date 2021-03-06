module.exports = {
	"presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["> 3%", "not ie <= 11"]
      },
      "useBuiltIns": false
    }]
  ],
	"plugins": [
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-class-properties",
  ]
}
