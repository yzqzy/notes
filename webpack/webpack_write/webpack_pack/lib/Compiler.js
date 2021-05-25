const path = require('path'),
      fs = require('fs'),
      babylon = require('babylon'),
      traverse = require('@babel/traverse').default,
      types = require('@babel/types'),
      generator = require('@babel/generator').default,
      ejs = require('ejs'),
      { SyncHook } = require('tapable');

class Compiler {
  constructor (config) {
    // 保存配置项
    this.config = config;
    // 保存入口文件的路径
    // ./src/index.js
    this.entryId;
    // 保存模块依赖
    this.modules = {};
    // ./src/index.js
    this.entry = config.entry;
    // 返回当前执行命令的目录
    this.root = process.cwd();
    // 生命周期钩子函数
    this.hooks = {
      afterOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
      run: new SyncHook()
    };
    // 提取plugins
    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPlugins.call();
  }

  run () {
    this.hooks.run.call();
    // 构建模块依赖关系
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    // 提交打包后的文件
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }

  /**
   * @description 模块内容处理
   * @param {string} modulePath 模块路径
   * @return {string} 
   */
  readSourceCode (modulePath) {
    // 配置文件中的rules
    let rules = this.config.module.rules;
    // 模块内容
    let sourceCode = fs.readFileSync(modulePath, 'utf-8');

    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];

      let { test, use } = rule,
            length = use.length - 1;

      // 处理匹配项
      if (test.test(modulePath)) {
        function _normalLoader () {
          let loader = require(use[length--]);
          sourceCode = loader(sourceCode);
          if (length >= 0) {
            _normalLoader();
          }
        }

        _normalLoader();
      }
    }

    return sourceCode;
  }

  /**
   * @description 构建模块依赖关系
   * @param {string} modulePath - 文件解析路径
   * @param {boolean} isEntry - 当前模块是不是主模块
   * @return {void}
   */
  buildModule (modulePath, isEntry) {
    // 模块代码
    let sourceCode = this.readSourceCode(modulePath);
    // 模块ID
    let moduleId = './' + path.relative(this.root, modulePath); // ./src/index,js

    moduleId = moduleId.replace(/\\/g, '/');

    // 父路经
    let parentPath = path.dirname(moduleId);

    // 是否为入口文件
    if (isEntry) {
      this.entryId = moduleId;
    }

    // 模块内容改造
    let { parsedSourceCode, dependencies } = this.parse(sourceCode, parentPath);

    // 设置相对路径模块的内容
    this.modules[moduleId] = parsedSourceCode; 

    // 递归调用
    dependencies.forEach(dep => {
      this.buildModule(path.join(this.root, dep), false);
    });
  }

    /**
   * @description 解析源码
   * @param {string} sourceCode - 模块源代码
   * @param {string} parentPath - 模块父路径
   * @return {object} 返回改造后的模块内容和依赖列表
   */
  parse (sourceCode, parentPath) {
    /**
     * @property {object} ast - 转换后的AST语法树
     * @property {array} dependencies - 依赖数组
     */
    let ast = babylon.parse(sourceCode),
        dependencies = [];

    traverse(ast, {
      CallExpression (p) {
        let node = p.node;

        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';

          let moduleId = node.arguments[0].value; // ./a.js

          moduleId = !!~moduleId.substring(1).indexOf('.') ? moduleId : moduleId + '.js';

          moduleId = './' + path.join(parentPath, moduleId); // ./src/s.js

          moduleId = moduleId.replace(/\\/g, '/');

          dependencies.push(moduleId);

          node.arguments = [types.stringLiteral(moduleId)];
        }
      }
    });

    // 将AST代码转换为JS代码
    let parsedSourceCode = generator(ast).code;

    return {
      parsedSourceCode,
      dependencies
    }
  }

  /**
   * @description 提交打包后文件
   */
  emitFile () {
    // 解构路径和名称
    let { path: outputPath, filename: outputFilename } = this.config.output;
    // 获取输出文件路径
    let main = path.join(outputPath, outputFilename)
    // 获取模板
    let templatePath = path.join(__dirname, 'main.ejs');
    let templateStr = this.readSourceCode(templatePath);
    // 数据渲染模板
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    });
    // 资源
    this.assets = {};
    this.assets[main] = code;
    // 将模块写入文件
    fs.writeFileSync(main, this.assets[main]);
  }
}

module.exports = Compiler;