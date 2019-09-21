<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      test: ''
    }
  },
  created () {
    // 使用 Mock
    var Mock = require('mockjs')
    // var data = Mock.mock({
    //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    //     'list|1-10': [{
    //         // 属性 id 是一个自增数，起始值为 1，每次增 1
    //         'id|+1': 1
    //     }]
    // })
    // 输出结果
    // console.log(JSON.stringify(data, null, 4));

    // Mock.mock( rurl, rtype, template )
    Mock.mock('/detail', 'get', {
        name: 'zhangshagn',
        arr: [],
        demo: {name: 'zhangsan', age:18}
    })
    Mock.mock(/\.json/, 'post', {
        type: 'post'
    })
    var _this = this;
    $.ajax({
        url: '/detail',
        type: 'get',
        dataType: 'json'
    }).done(function (data, status, jqXHR) {
        console.log(data);
        _this.test = data;
    })


    
    // // 配置 Mock 路径
    // require.config({
    //     paths: {
    //         mock: 'http://mockjs.com/dist/mock'
    //     }
    // })
    // // 加载 Mock
    // require(['mockjs'], function(Mock){
    //     // 使用 Mock
    //     var data = Mock.mock({
    //         'list|1-10': [{
    //             'id|+1': 1
    //         }]
    //     })
    //     // 输出结果
    //     document.body.innerHTML +=
    //         '<pre>' +
    //         JSON.stringify(data, null, 4) +
    //         '</pre>'
    // })



  }
}
</script>
