module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100,
      selectorBlackList: ['mint', 'van'],
      propList: ['*']
    }
  }
}
