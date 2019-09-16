<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabbar',

  }
</script>

<style scoped>
.tabbar {
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>