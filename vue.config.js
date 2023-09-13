const fs = require('fs');

process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_DDD_VIEWER_APP_VERSION = require('./package.json').version
process.env.VUE_APP_DDD_VIEWER_VERSION = require('./package.json').version
process.env.VUE_APP_DDD_VERSION = require('./package.json').version

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
  },
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "3dsmaps - DDD";

            // Process app config
            const dddViewerAppBuildEnv = process.env.DDD_VIEWER_APP_BUILD_ENV || "devel";
            const dddViewerAppConfig = JSON.parse(fs.readFileSync(`config/ddd-viewer-app.config.${dddViewerAppBuildEnv}.json`, 'utf8'));

            // Override some config parameters from environment variables for development convenience
            dddViewerAppConfig.tileUrlBase = process.env.DDD_VIEWER_APP_TILE_URL_BASE || dddViewerAppConfig.tileUrlBase;

            args[0].dddViewerAppConfig = JSON.stringify(dddViewerAppConfig, null, 4);

            return args;
        })
  }

}
