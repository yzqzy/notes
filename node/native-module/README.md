## Building a native C++ module for Node.js

```bash
npm install -g node-gyp
```

```bash
cd my_native_module
```


```bash 
node-gyp configure # 生成binding.gyp文件
```

```bash
node-gyp build --debug # debug 模式编译指令
node-gyp build # release 模式编译指令
```
