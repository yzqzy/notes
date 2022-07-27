# 声明文件

常见库的格式以及如何为每种格式书写正确的声明文件。

## 识别库的类型

## 全局库

例如 jQuery，`$` 变量可以被简单的引用。

```js
$(() => { console.log('hello') });
```

可以在全局库的文档中看到如何在 HTML 里用脚本标签引用库

```html
<script src="http://a.great.cdn.for/somelib.js"></script>
```

代码识别全局库

```js
function createGreeting = function (s) {
	return 'Hello, ' + s;
}
```

or

```js
window.creatGreeting = function (s) {
  return 'Hello, ' + s;
}
```

## 模板化库

一些库只能工作在模块加载器的环境下。例如 express 只能在 `node.js` 中运行。

```js
const fs = require('fs');
```

```js
define(..., ['somelib'], function (somelib) {
  
});
```

代码识别模块化库

* 无条件的调用 require 或 define
* `import * as a from “b”` 、`export c` 
* 赋值给 `exports` 或 `module.exports`
* 极少包含对 window 或 global 赋值

## UMD 模块（UMD 库）

UMD 模块是指哪些即可以作为模块使用又可以作为全局使用的模块，例如 `Moment.js`，就是这样的形式。

```js
// node
import moment = require('moment');

console.log(moment.format())
```

```js
// html
console.log(moment.format())
```

识别 UMD 模块

> UMD 模块会检查是否存在模块加载器环境。这是非常容易观察到的模块

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['libName'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('libName'));
  } else {
    root.returnExports = factory(root.libName);
  }
})(this. function (b) {})
```

如果在库的源码中看到 `typeof define`、`typeof window` 或 `type module`  这样的测试，尤其是在文件顶端，它几乎就是一个 UMD 库。

## 模块插件、UMD 插件

一个插件可以改变一个模块的结构（UMD或模块）。

**全局插件**

一个全局插件是全局代码，他们会改变全局对象的结构。一些库往 `Array.prototype` 或 `String.prototype`  里添加新的方法。

##  全局库的声明文件

目录结构

```js
src
	-	typings
		- index.d.ts
	- index.ts
- index.html
- tsconfig.json
```

以 jQuery 为例。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div class="box"></div>

  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>

  <script type="module" src="./src/index.ts"></script>
</body>
</html>
```

```js
// src/typings/index.d.ts

declare const jQuery: (param: string) => void;

declare let foo: number;
declare const foo2: number = 2;

declare function greet (greeting: string): void;

// 命名空间
declare namespace mylib {
  function makeGreet (greeting: number): void;
  let numberOfGreeting: number;

  namespace fn {
    function test(s: string): void;
    let test1: string;
  }
}

// 函数重载
declare function getWidget(n: number): number;
declare function getWidget(s: string): string[];

// 可重用的类型接口
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}
declare function greetFn(setting: GreetingSettings): void;

// 类型
type GreetingLike = string | (() => string) | GreetingSettings;
declare function greetLike (g: GreetingLike): void;

// 类
declare class Greeter {
  constructor(geeeting: string) { }

  grerting: string;
  showGreeting(): void;
}
```

```js
// src/index.ts

console.log(jQuery('#box'));

foo = 123;
console.log(foo);

function greet (str: string) { }
greet('123');

mylib.makeGreet(123);
mylib.numberOfGreeting;
mylib.fn.test('123');
mylib.fn.test1;

let x = getWidget(43);
let arr = getWidget('all of them');

greetFn({
  greeting: '123'
});
const GreetingSettingsExtra: GreetingSettings = {
  greeting: '234'
}

greetLike('123');
greetLike(() => '123');
greetLike({
  greeting: '123'
});

const greeter = new Greeter('123');
greeter.grerting;
greeter.showGreeting();
```

```js
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "./src",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "resolveJsonModule": true,                        /* Enable importing .json files */
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    // "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when a local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  /** 默认配置 start */
  "include": [
    "src/**/*",
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
  /** 默认配置 end */
}
```



interface 和 type 不需要 declare 声明就可以直接使用。

变量声明重复声明只有第一个声明生效。
接口声明重复声明会发生声明合并。

## 模块化库声明文件

