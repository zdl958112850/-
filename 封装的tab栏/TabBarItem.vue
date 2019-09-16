<template>
  <div class="tabbar-item">
    <slot class="test" name="item-pic"></slot>
    <slot name="item-text"></slot>  
  </div>
</template>

<script>
  export default {
    name: 'tabbar',

  }
</script>

<style scoped>
.tabbar-item {
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  color: #fcc;
}
.test {
  color: red;
  /* font-size: 200px; */
}
</style>