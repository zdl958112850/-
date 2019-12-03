引入所有的样式

按需引入: 
下载安装 babel的插件， 
在 .babellrc 中配置

{
  "presets": [
    ["es2015", { "modules": false }] // 将es2015换为env
  ],
  "plugins": [["component", 
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]
}



import