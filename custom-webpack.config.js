const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),        
        hostDirfApi: JSON.stringify(process.env.DIRF_DIRFPORTALLEGAISAPI_SERVICE_HOST),
        portDirApi: JSON.stringify(process.env.DIRF_DIRFPORTALLEGAISAPI_SERVICE_PORT),
        hostMenuApi: JSON.stringify(process.env.PORTAL_LEGAIS_REGULATORIOS_SERVER_SERVICE_HOST),
        portMenuApi: JSON.stringify(process.env.PORTAL_LEGAIS_REGULATORIOS_SERVER_SERVICE_PORT)
      }
    })
  ]
};