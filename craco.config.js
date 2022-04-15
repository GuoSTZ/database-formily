const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              // '@ant-prefix': 'McFormily-ant' 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};