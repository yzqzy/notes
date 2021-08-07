// Generator 核心入口

// 需要导出一个继承自 Yeoman Generator 的类型，Yeoman Generator 工作时会自动调用在此类型中的生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入等

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing () {
    // Yeoman 在生成文件阶段会自动调用次方法，我们这里尝试往项目目录中写入文件
    // this.fs.write(
    //   this.destinationPath('test.txt'),
    //   Math.random().toString()
    // );

    // 通过模板方式写入文件到目标目录
    const tmpl = this.templatePath('foo.txt');
    // 输出目录
    const output = this.destinationPath('foo.txt');
    // 模板数据上下文
    const context = { title: 'Hello ~', success: true };

    this.fs.copyTpl(tmpl, output, context);
  }
}