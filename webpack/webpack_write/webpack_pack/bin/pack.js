#!/usr/bin/env node

let path = require('path');

// webpack.config.js 配置文件
let config = require(path.resolve('webpack.config.js'));

// 引入编译的类 Compiler
let Compiler = require('../lib/Compiler');
let compiler = new Compiler(config);

compiler.hooks.afterOption.call();
// 执行编译
compiler.run();
