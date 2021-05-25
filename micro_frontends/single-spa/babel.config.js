module.exports = function (api) {
  // 缓存babel的配置
  api.cache(true);

  return {
    // 预设
    presets: [
      [ '@babel/preset-env', { modules: false } ]
    ],
    // 支持 import 语法
    plugins: [ '@babel/plugin-syntax-dynamic-import' ]
  }
}