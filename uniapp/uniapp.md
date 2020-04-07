# uni-app

## 	需要安装工具

![image-20200405201401978](.\uniapp.assets\image-20200405201401978.png)

## 通过hbuilder 创建uniapp

![image-20200405201557506](.\uniapp.assets\image-20200405201557506.png)

## 运行到浏览器

![image-20200405201638435](.\uniapp.assets\image-20200405201638435.png)

##  第一次运行的时候要注意

![image-20200405201752294](.\uniapp.assets\image-20200405201752294.png)

- 设置ide, 微信小程序的地址
- 配置服务端口
- ![image-20200405201952679](.\uniapp.assets\image-20200405201952679.png)

## 开发规范

![image-20200405202554654](.\uniapp.assets\image-20200405202554654.png)

## 设置顶部tabbar

![image-20200405202857144](.\uniapp.assets\image-20200405202857144.png)

- 在pages.json中写入
- ![image-20200405202923917](.\image-20200405202923917.png)
- 顶部文字只能是黑白
- ![image-20200405203011102](.\uniapp.assets\image-20200405203011102.png)
- 开启下拉

## 单独配置每一个页面样式

![image-20200405204145524](.\uniapp.assets\image-20200405204145524.png)

## 单独配置h5的样式

![image-20200405204337705](.\uniapp.assets\image-20200405204337705.png)

## tabbar的配置

![image-20200405204837461](.\uniapp.assets\image-20200405204837461.png)

## 配置调试默认打开页面

![image-20200405210459524](.\uniapp.assets\image-20200405210459524.png)

![image-20200405210603261](.\uniapp.assets\image-20200405210603261.png)

页面参数![image-20200405210725733](.\uniapp.assets\image-20200405210725733.png)

## 组件的使用

- text 组件
- ![image-20200405211056292](.\uniapp.assets\image-20200405211056292.png)
- view 组件
- ![image-20200405211622434](.\uniapp.assets\image-20200405211622434.png)
- 指定按下去的样式 hover-class
- 类似阻止冒泡![image-20200405211758745](.\uniapp.assets\image-20200405211758745.png)
- 2s后开始,, 松开之后2s才开始![image-20200405212003710](.\uniapp.assets\image-20200405212003710.png)

## 在img中控制它的纵横比

```css
1. object-fit: contain;
2. width: 100%;
```

## uniapp样式

![image-20200406134312378](uniapp.assets/image-20200406134312378.png)

- 750rpx 也就是 整个屏幕的宽度
- 也可以给字体设置

![image-20200406134635442](uniapp.assets/image-20200406134635442.png)

- 导入外部css
- ![image-20200406134721033](uniapp.assets/image-20200406134721033.png)
- uniapp 不能使用*, 
- ![image-20200406134811827](uniapp.assets/image-20200406134811827.png)
- 推荐使用~@的方式引入![image-20200406135255394](uniapp.assets/image-20200406135255394.png)
- 总结使用方式: 
  - 将字体图标文件导入, 然后使用@import 在 App.vue 中的style 中导入, 
  - 如果想使用scss预编译器, 可以通过以下方式安装
  - ![image-20200406135609458](uniapp.assets/image-20200406135609458.png)
  - 全局的scss样式变量
  - ![image-20200406135748318](uniapp.assets/image-20200406135748318.png)

## 动态数据绑定

- 差值绑定

  - ```js
    {{msg}}
    ```

- v-bind

  - ![image-20200406140548261](uniapp.assets/image-20200406140548261.png)

- uniapp 事件

  - 传参的时候拿到事件对象
  - ![image-20200406141232248](uniapp.assets/image-20200406141232248.png)

## 生命周期

**应用的生命周期**

- ![image-20200406141356996](uniapp.assets/image-20200406141356996.png)
- onlaunch只会出发一次, 但是onshow, 从后台进入前台都会出发

**页面的生命周期**

![image-20200406141823988](uniapp.assets/image-20200406141823988.png)

- onload 可以拿到上一个页面传递过来的参数
- ![image-20200406142117312](uniapp.assets/image-20200406142117312.png)
- tabbar中的, 已经显示过的将不会触发onload生命周期
- 下拉刷新
- ![image-20200406142310567](uniapp.assets/image-20200406142310567.png)
- 这种方式是全局的开启页面刷新
- ![image-20200406142344160](uniapp.assets/image-20200406142344160.png)
- 单个页面配置下拉刷新
- ![image-20200406142608076](uniapp.assets/image-20200406142608076.png)
- 下拉刷新
- ![image-20200406142808282](uniapp.assets/image-20200406142808282.png)
- 下拉刷新完毕后关闭下拉刷新![image-20200406142858975](uniapp.assets/image-20200406142858975.png)
- 手动触发下拉刷新
- ![image-20200406143033367](uniapp.assets/image-20200406143033367.png)
- 监听页面到达底部的事件
- ![image-20200406143132491](uniapp.assets/image-20200406143132491.png)
- 配置pages.json中配置距离底部多少触发触底事件
- ![image-20200406143321322](uniapp.assets/image-20200406143321322.png)

## 配置request

![image-20200406143440847](uniapp.assets/image-20200406143440847.png)

- 搭建本地接口
  - 安装phpstudy
  - 发送请求
  - ![image-20200406144139224](uniapp.assets/image-20200406144139224.png)

## 设置缓存

![image-20200406144220567](uniapp.assets/image-20200406144220567.png)

- 表示同步的sync
- ![image-20200406144338889](uniapp.assets/image-20200406144338889.png)
- 获取数据
- ![image-20200406144530408](uniapp.assets/image-20200406144530408.png)
-  同步的方式 推荐使用
- ![image-20200406144814351](uniapp.assets/image-20200406144814351.png)
- ![image-20200406144928974](uniapp.assets/image-20200406144928974.png)

## 上传图片和预览图片

- 上传图片的方式
- ![image-20200406145328822](uniapp.assets/image-20200406145328822.png)
- 小程序可以限制长传的数量, 但是浏览器不能
- 预览图片
- ![image-20200406145645981](uniapp.assets/image-20200406145645981.png)
- ![image-20200406145844311](uniapp.assets/image-20200406145844311.png)

## 条件注释

![image-20200406150418735](uniapp.assets/image-20200406150418735.png)

- 只能在h5中显示
- ![image-20200406150433884](uniapp.assets/image-20200406150433884.png)
- 在js中写入
- ![image-20200406150628550](uniapp.assets/image-20200406150628550.png)
- 样式
- ![image-20200406150746080](uniapp.assets/image-20200406150746080.png)

## 导航跳转

- 申明式导航
- ![image-20200406151052376](uniapp.assets/image-20200406151052376.png)
- 如果想跳转到tab页需要进行如下设置
- ![image-20200406151214985](uniapp.assets/image-20200406151214985.png)
- ![image-20200406151132592](uniapp.assets/image-20200406151132592.png)
- 设置为redirect的时候将不能再返回, 并且页面会卸载, 销毁掉
- ![image-20200406151418667](uniapp.assets/image-20200406151418667.png)
- 编程式导航
- ![image-20200406151532711](uniapp.assets/image-20200406151532711.png)
- ![image-20200406151544557](uniapp.assets/image-20200406151544557.png)
- 跳转到tabbar页面并且关闭其他非tabbar页面
- ![image-20200406151718247](uniapp.assets/image-20200406151718247.png)
- 跳转到详情并且关闭当前页面
- ![image-20200406151905018](uniapp.assets/image-20200406151905018.png)
- 传参
- 编程式
- ![image-20200406151947239](uniapp.assets/image-20200406151947239.png)
- 通过以下方式获取参数
- ![image-20200406152007662](uniapp.assets/image-20200406152007662.png)

## 组件

- 组件的创建
  - ![image-20200406152148938](uniapp.assets/image-20200406152148938.png)
  - 和vue类似
- 组件中的生命周期
- 此时实例已经开始初始化了, 但是数据还没有初始化完毕
- ![image-20200406152455534](uniapp.assets/image-20200406152455534.png)-
- created 表示实力创建完成, 也就是该组件创建成功, 但是还没有挂在到页面上
- ![image-20200406152648837](uniapp.assets/image-20200406152648837.png)
- 挂载之前
- ![image-20200406152803624](uniapp.assets/image-20200406152803624.png)

## 组件的通信

- 父传子
- props, v-bind
- this.$emit(myEvent, this.number') , 通过@myEvent监听

## uni-ui

- 点击下载
- ![image-20200406153604926](uniapp.assets/image-20200406153604926.png)



# 项目

- 封装request请求
- ![image-20200406195312296](uniapp.assets/image-20200406195312296.png)
- ![image-20200406195319002](uniapp.assets/image-20200406195319002.png)
- 推荐设计人员使用 375的设计稿
- $shop-color 定义scass变量
- letter-spacing  控制文字之间的间距
- 处理加载数据并且控制不再加载
- ![image-20200406202804559](uniapp.assets/image-20200406202804559.png)
- 下拉刷新
- ![image-20200406202819672](uniapp.assets/image-20200406202819672.png)
- ![image-20200406202859087](uniapp.assets/image-20200406202859087.png)
- 传了一个回调函数, 控制下拉刷新状态





## 打包

- 在微信小程序中点击上传, 但是要去这里面设置appid
- ![image-20200406204319575](uniapp.assets/image-20200406204319575.png)
- 安卓打包
- 













































