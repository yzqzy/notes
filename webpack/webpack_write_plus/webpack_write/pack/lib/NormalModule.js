const path = require('path');
const types = require('@babel/types');
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

class NormalModule {
  constructor (data) {
    this.name = data.name;
    this.context = data.context;
    this.moduleId = data.moduleId;
    this.rawRequest = data.rawRequest;
    this.parser = data.parser;
    this.resource = data.resource;
    this._source = undefined; // 模块源代码
    this._ast = undefined; // 模块源代码对应的 AST
    this.dependencies = []; // 定义空数组，用于保存被依赖加载的模块信息
  }

  getSource (compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf-8', callback);
  }

  doBuild (compilation, callback) {
    this.getSource(compilation, (err, source) => {
      this._source = source;
      callback();
    });
  }

  build (compilation, callback) {
    // 从文件中读取需要被加载的 module 内容
    // 如果当前不是 js 模块，则需要 loader 进行处理，最终也是返回 js 模块
    // 上述操作完成之后，就可以将 js 代码转换为 ast 语法树
    // 当且 js 模块内部可能又引用很多其他模块，需要递归处理
    this.doBuild(compilation, (err) => {
      this._ast = this.parser.parse(this._source);

      // _ast 就是当前 module 的语法树，我们可以对它进行修改，最后再将 ast 树转换为 code
      // https://astexplorer.net
      traverse(this._ast, {
        CallExpression: (nodePath) => {
          const node = nodePath.node;

          // 定位 require 所在的节点
          if (node.callee.name === 'require') {
            // 获取原始请求路径
            const modulePath = node.arguments[0].value; // './title'
            // 获取当前被加载的模块名称
            let moduleName = modulePath.split(path.posix.sep).pop(); // title
            // 当前只处理 js，只考虑 js 文件处理
            const extName = moduleName.indexOf('.') === -1 ? '.js' : '';
            // 拼接路径
            moduleName += extName; // title.js
            // 拼接绝对路径
            const depResource = path.posix.join(path.posix.dirname(this.resource), moduleName);
            // 将当前模块的 ID 定义 ok
            const depModuleId = './' + path.posix.relative(this.context, depResource); // ./src/title.js

            // 保存当前被依赖模块的信息，方便后续递归加载
            this.dependencies.push({
              name: this.name, // TODO
              context: this.context,
              rawRequest: moduleName,
              moduleId: depModuleId,
              resource: depResource
            });
            
            // 替换内容
            node.callee.name = '__webpack_require__';
            node.arguments = [types.stringLiteral(depModuleId)];
          }
        }
      });

      // 利用 ast 修改代码后，然后需要将修改后的 ast 树转会可执行 code
      const { code } = generator(this._ast);

      this._source = code;

      callback(err);
    });
  }
}

module.exports = NormalModule;