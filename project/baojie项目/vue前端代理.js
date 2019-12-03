在vue.config.js中添加


module.exports = {


  devServer: {
    proxy: {
      '/api': {
        target: 'http://yapi.demo.qunar.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
        	"^api": "/mock/234/api"; // 重写路径， 以api开头的跳转到后面路径
        }
      },
    }
  }


}