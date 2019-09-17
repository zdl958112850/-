<template>
  <div id="app">
    
    <router-view/>
    <tab-bar>
      <tab-bar-item   path="/index">
        <div slot="pic">图片</div>
        <div slot="pic-active">图片活跃</div>
        <div slot="txt">文字</div>
      </tab-bar-item>
      <tab-bar-item path="/profile"> 
        <div slot="pic">图片</div>
        <div slot="pic-active">图片活跃</div>
        <div slot="txt">文字</div>
      </tab-bar-item>
      <tab-bar-item path="/index">
        <div slot="pic">图片</div>
        <div slot="pic-active">图片活跃</div>
        <div slot="txt">文字</div>
      </tab-bar-item>
    </tab-bar>
  </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/TabBar.vue'
import TabBarItem from '@/components/TabBar/TabBarItem.vue'
export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  },
}
</script>

<style>
#app {

}
</style>
