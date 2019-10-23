npm i fastclick
import fastClick from 'fastclick'

fastClick.attach(document.body)


// 禁用组件缓存
deactivated () {
  // 自杀
  this.$destroy()
},