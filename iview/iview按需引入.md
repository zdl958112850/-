# [iview简单使用+按需加载组件的方法（全局和局部）](https://www.cnblogs.com/wangtong111/p/11522520.html)



**1，简单使用**

vue项目中使用iview非常简单：

首先安装依赖：

```
$ npm install iview --save
```

会安装最新版本的依赖，安装完成后package.json会出现如下图配置

![img](https://img2018.cnblogs.com/blog/1220589/201909/1220589-20190915123942133-488382536.png)

 

表示iview已经安装完成

然后在main.js中引入“iview”和相应的css文件“iview/dist/styles/iview.css”，并use，即全局引用，如下图

![img](https://img2018.cnblogs.com/blog/1220589/201909/1220589-20190915125604113-225858549.png)

 

 此时即可以在所有组件中使用iview中的组件了。

**2，按需加载**

简单使用很简单，按需加载也并不复杂

按需加载要在简单使用的前提下安装一个依赖： [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

首先安装此依赖

 

```
npm install babel-plugin-import --save-dev
```

 

安装完成后可在package.json——devDependencies中看到如下属性

![img](https://img2018.cnblogs.com/blog/1220589/201909/1220589-20190915142326502-782544744.png)

 

 然后在.babelrc文件中plugins属性中添加如下配置

```
["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }]
```

如图

![img](https://img2018.cnblogs.com/blog/1220589/201909/1220589-20190915142601581-898788283.png)

 

 **2.1全局按需加载特定组件**

此后需要修改main.js中的引入

如下：

![img](https://img2018.cnblogs.com/blog/1220589/201909/1220589-20190915143713427-1003865651.png)

 

 css文件仍然要有，引入的完整iview替换为特定组件，vue.use()替换为vue.component()

此后可在全局使用引入的组件

这样做的好处是减少引入体积，增快加载效率；

 

**2.2局部按需加载特定组件**

在安装和配置babel-plugin-import依赖之后main.js不需要做任何修改

在相应需要用到iview组件的位置作如下引入（本质上跟全局引入是一样的），如下图

![img](https://img2018.cnblogs.com/blog/1220589/201909/1220589-20190915144852145-1122391795.png)

 

 此时可以在本位置（即特定组件）下使用

2.2ps：此时还有一点需要说明，由于vue是单页面应用，所以即使是局部加载特定组件，当该组件加载之后就意味着上图中的spin已经挂载到vue原型上，所以在该组件加载之后，就变成了全局可用组件。

如上，其实局部按需加载特定组件并没有特别大的意义。



<https://www.cnblogs.com/wangtong111/p/11522520.html>