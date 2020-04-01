<!--
 * @Author: your name
 * @Date: 2020-03-09 23:52:54
 * @LastEditTime: 2020-03-10 00:51:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pcc:\Users\admin\Desktop\vue项目优化.md
 -->
**vue项目优化**
**第二遍边看视频边整理, 对了在这里推荐一下 Preview Enhanced插件, 在vscode中很好使用, 可以边写md文件, 边看效果**
**写这边文章为了pp好看, 另外也为了自己总结整理**

# 项目打包报告

# 安装和配置webpack-bundle-analyzer  -D

```js
 chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // config.module.rule('js').include.add(/node_modules\/(dom7|swiper)\/.*/);
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
```

  ## 生成打包报告
  - 通过安装vue cli  npm install -g @vue/cli
  - 然后使用vue ui 在里面有一个build, 运行, 完成之后就能看到打包体积
# 通过 chainWebpack 自定义打包入口
  - 创建一个vue.config.js文件
  - 创建两个main文件, 分别为main-prod.js 和main-dev.js
  - 然后再不同的环境中使用不同的js, 开发的时候使用开发那
  - 在里面写入一下代码
```js
  module.exports = {
    chainWebpack: config => {
      config.when(process.env.NODE_ENV === 'production', config => {
        config.entry('app').clear().add('./src/main-prod.js')
      })
      config.when(process.env.NODE_ENV === 'development', config => {
        config.entry('app').clear().add('./src/main-dev.js')
      })
    }
  }
```
# 通过externals 加载外部cdn资源, 从而减少打包体积
- 继续在vue.config.js中的生产模式下配置
```js
  config.set('externals', {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_',
    echarts: 'echarts',
    nprogress: 'NProgress',
    'vue-quill-editor': 'VueQuillEditor'
  })
```
- 需要在public/index.html文件中添加cnd资源引用
```html
  <link rel="stylesheet" href="https://cdn.dfd.css">
```
- 注意这里是将那些样式表, 或者js在html中使用cdn的方式引入, 但是在main.js中也得引入 比如: import echarts from 'echarts'; 但是如果使用了以上externals配置, 打包的时候就不会将该文件打进去, 而是使用cdn的方式
# element使用cdn的方式引入
```html
  <link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css" /> 

  <script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>
```
- 这样就可以不用再main.js中引入
# 首页内容自定制
- 当前需求: 在开发环境时, 给前面添加一个dev
```js
  config.when(process.env.NODE_ENV == 'production', config => {
    config.plugin('html').tap(args=> { //args是参数项, 给里面添加一个isProd属性
      args[0].isProd = true;
      return args
    })
  })
  config.when(process.env.NODE_ENV == 'development', config => {
    config.plugin('html').tap(args=> {
      args[0].isProd = false; // 这样的话, 就可以在页面中根据isProd的值, 来决定如何渲染页面结构
      return args
    })
  })
```
```html
  <title><%= html.WebpackPlugin.options.isProd? '' : 'dev' %>电商后台</title>
```
```html
<% if(htmlWebpackPlugin.options.isProd) {  %>
<!- 通过cnd引入的资源 --> // 这样的话就能实现, 这里面使用cdn资源, 也就是在开发模式下面不会使用cdn, 而是使用import的方式, 就会快一点
<% } %>
```
# 路由懒加载的方式
- 安装@babel/plugin-syntax-dynamic-import包
- 在babel.config.js配置文件中申明该插件
- 将路由改为按需加载的形式, 示例代码如下: 
  ```js
    const Foo = () => import (/* webpackChunkName: "group-foo" */ './Foo.vue'); // 这里就能使用懒加载的方式
  ```
- **需要重点强调的是:**
- 使用前需要安装babel, 才能使用() => import 的方式
- 里面的webpackChunkName不是没有用, 他后面的group-foo就是打包成功后的一个js文件, 如果同名的太多的话, 会导致该文件体积过大
# 项目上线
-  通过node创建web服务器
-  通过npm init -y 初始化环境
-  然后下载express 插件
-  node 执行以下app.js文件
```js
const express = require('express');
// 创建服务器
const app = express();
// 托管金泰资源
app.use('express.statis('./dist')) //dist就是打包之后的文件目录
// 启动服务器
app.listen(80, ()=> {
  console.log('web server running at http://127.0.0.1')
})
```
# 开启gzip 配置
- 使用gzip keyi8减小文件体积, 使得传输快
- 默认是没有开启的, 该文件在网络中有多大, 就会发送多大
```js
  // 安装包
  npm i compression -D;
  // 导入包
  const compression = require('compression');
  //启动中间件
  app.use(compression()); // 这句代码一定要执行在静态资源之前
  app.use(express.static('./dist'))
```
# 配置https服务器
- 为什么要配置?
- 传统的https协议传输的数据是明文, 不安全
- 采用https协议对传输的数据进行了加密处理, 可以防止数据被中间人窃取, 使用更安全
## 申请SSL证书(https://freessl.org) 个人用户免费
## 输入自己的邮箱选择相关选项
## 验证DNS(在域名管理后台添加TXT 记录)
## 验证通过之后, 下载SSL证书(full_chain.pem 公钥; private.key 私钥)

one hour 且读且珍惜