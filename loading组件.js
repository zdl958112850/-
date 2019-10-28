在src目录下新建store目录，store目录下新建store.js文件  （已确保已装好vuex）

import Vue from 'vue'
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
const store = new Vuex.Store({
    state: {
        LOADING: false
    },
    mutations: {
        showLoading(state){
            state.LOADING = true    
        },
        hideLoading (state) {
            state.LOADING = false
        }
    }
})
export default store
loading组件如下：（图片建议网上找无背景的图）附我用的图（http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif）

<template>
  <div class="loading">
    <img src="./../assets/img/loading.gif" alt="">
  </div>
</template>
 
<script>
  export default {
    name: 'LOADING',
    data () {
      return {}
    },
  }
</script>
<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .loading img{
  	width: 1rem;
  	height: 1rem;
    margin:7.5rem auto;
  }
</style>
在app.vue中使用loading组件

<template>
  <div id="app" class="app">
  	<loading v-show="LOADING"></loading>
    <router-view/>
  </div>
</template>
 
<script>
    import {mapState} from 'vuex'
    import Loading from './views/loading.vue'
    export default {
        computed:{
            ...mapState([
                'LOADING'
            ])
        },
        name: 'App',
        components: {
		 Loading,
		 }
    }
</script>
 
<style>
#app {
  font-family: Helvetica, sans-serif;
  height: 100%;
}
</style>
然后main.js

import store from './store/store'
 
Vue.use(moment);
Vue.use(Vant)
Vue.config.productionTip = false
 
 
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
如果需要在请求封装中使用在请求中加

axios.interceptors.request.use(
    config => {
        store.commit('showLoading')
    error => {
        store.commit('hideLoading')
    })
axios.interceptors.response.use(
    response => {
        store.commit('hideLoading')
    },
 
    error => {
        store.commit('hideLoading')
    }
);
如在单个请求中使用，在 请求时 中加

this.$store.commit('showLoading')
       
   请求完成后加    
  this.$store.commit('hideLoading')
