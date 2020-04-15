// vue.config.js
var webpack = require("webpack");

module.exports = {  
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          // Define variables 
          API_URL: JSON.stringify(process.env.API_URL)
        }
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.transpileOptions = {
          transforms: {
            dangerousTaggedTemplateString: true
          }
        };
        return options;
      });
  }
};
