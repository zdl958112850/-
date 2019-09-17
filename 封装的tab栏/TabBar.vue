<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data() {
    return {
    }
  },

  components: {},

  computed: {},



  methods: {}
}

</script>
<style scoped>
  .tabbar {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    text-align: center;
    background-color: #f6f6f6;
  }
</style>