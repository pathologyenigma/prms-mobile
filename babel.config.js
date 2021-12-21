module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['@babel/plugin-proposal-export-namespace-from'],
  env: {
    production: {
      plugins: [['transform-remove-console', { exclude: ['warn', 'error'] }]],
    },
  },
}
