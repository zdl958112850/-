## 按需引入
记录按需引入的坑

步骤: 
-   下载 npm i babel-plugin-import -D;
-   在 babel.config.js 中写入一下内容
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [["import", {
    "libraryName": "view-design",  // 根据不同的ui框架进行改变, 这是新版的iview, 
    "libraryDirectory": "src/components" // 不同的也有不一样
  }]]
}

```
-   然后在 main.js 中写入
```js
import {
  Button,
  DatePicker ,
 } from 'view-design';

Vue.component('Button', Button);
Vue.component('DatePicker', DatePicker); // 根据官网 看看如何写, 有的是 use

// 对了这块, 要注意一个细节: 使用 message 的时候写法不一样, 应该为以下

Vue.prototype.$Message=Message; // 前面也得 import 
```
-   完成这些步骤之后, 然后可以通过 babel-analyze 可以看见体积有明显的减少
-   重点来了, 一个坑
```js
通过以上, 官网中的讲解, 配出来在谷歌下面是没有问题的, 但是在ie11就有问题了
会报 chunk.js 无效字符, 因为这个项目在ie和360兼容不行
主要原因是, 那种方式通过es6, 然而ie 不支持 es6, 虽然配置过 babel, 但是 babel 默认是不会去解析 node_modules 中的东西 
```
-   解决方法
```js
 // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
//  在vue.config.js中写入
transpileDependencies: [
    /view-design.src.*?js$/
], 
```