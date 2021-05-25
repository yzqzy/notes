const fs = require('fs').promises;
const path = require('path');
const { resolveVue } = require('./utils');

const defaultExportRE = /((?:^|\n|;)\s*)export default/;

function vuePlugin ({ app, root }) {
  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith('.vue')) {
      return next();
    }

    const filePath = path.join(root, ctx.path);
    const content = await fs.readFile(filePath, 'utf-8');

    let { parse, compileTemplate } = require(resolveVue(root).compiler);
    let { descriptor } = parse(content);

    if (!ctx.query.type) {
      // vue 文件
      let code = '';

      if (descriptor.script) {
        let content = descriptor.script.content;
        let replaced = content.replace(defaultExportRE, '$1const _script = ');
        code += replaced;
      }
      if (descriptor.template) {
        const templateRequest = ctx.path + '?type=template'; // App.vue?type=template
        code += `\nimport {render as _render} from ${JSON.stringify(templateRequest)}`;
        code += `\n_script.render = _render`;
      }

      code += `\nexport default _script`;

      ctx.type = 'js';
      ctx.body = code;
    }
    if (ctx.query.type == 'template') {
      let content = descriptor.template.content;

      const {  code } = compileTemplate({ source: content });
      
      ctx.type = 'js';
      ctx.body = code;
    }
  });
}

exports.vuePlugin = vuePlugin;