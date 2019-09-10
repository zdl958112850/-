 proxyTable: {

      '/api': {

            target: 'http://172.00.61.243:8082', // 你接口的域名  http://172.00.61.243:8082

            //secure: false,      // 如果是https接口，需要配置这个参数

            changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置

            pathRewrite: {

              '^/api': ''

            }

        }

  　},



http://www.hehaibao.com/webpack-proxytable/ 