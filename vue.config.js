const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
}),
module.exports = {
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = JSON.stringify(true);
        return args;
      });
  }
};