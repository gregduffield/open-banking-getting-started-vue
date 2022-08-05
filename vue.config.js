// vue.config.js
module.exports = {
  chainWebpack(config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with certua- as custom elements
          isCustomElement: (tag) => tag.startsWith('certua-')
        }
      }));
  }
};
