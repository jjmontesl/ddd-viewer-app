module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },
  configureWebpack: {
    resolve: { symlinks: false },
    devServer: {
      compress: true,
      disableHostCheck: true,
    }
  }
}
