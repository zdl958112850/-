 proxyTable: {

      '/api': {

            target: 'http://172.00.61.243:8082', // ��ӿڵ�����  http://172.00.61.243:8082

            //secure: false,      // �����https�ӿڣ���Ҫ�����������

            changeOrigin: true,     // ����ӿڿ�����Ҫ���������������

            pathRewrite: {

              '^/api': ''

            }

        }

  ��},



http://www.hehaibao.com/webpack-proxytable/ 