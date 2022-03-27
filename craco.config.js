const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgba(0,82,204,1)' ,'@font-size-base':'16px'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};