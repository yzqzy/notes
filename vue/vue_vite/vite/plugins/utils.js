const Stream = require('stream');
const path = require('path');

async function readBody (stream) {
  if (!(stream instanceof Stream)) {
    return stream.toString();
  }

  return new Promise((resolve, reject) => {
    let res = '';
    stream.on('data', data => {
      res += data;
    });
    stream.on('end', () => {
      resolve(res);
    });
  });
}

/**
 * @description 模块读取
 */
function resolveVue (root) {
  const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json');
  const compilerPkg = require(compilerPkgPath);
  const compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkg.main);

  const resolvePath = (name) => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`);

  const runtimeDomPath = resolvePath('runtime-dom');
  const runtimeCorePath = resolvePath('runtime-core');
  const reactivityPath = resolvePath('reactivity');
  const sharedPath = resolvePath('shared');

  return {
    compiler: compilerPath,
    '@vue/runtime-dom': runtimeDomPath,
    '@vue/runtime-core': runtimeCorePath,
    '@vue/reactivity': reactivityPath,
    '@vue/shared': sharedPath,
    vue: runtimeDomPath
  }
}

exports.readBody = readBody;
exports.resolveVue = resolveVue;