<template>
  <div class="tabbaritem" @click="handleRedir">
    <div class="pic">
      <slot  v-if="!isactive" name="pic">
      </slot>
      <slot v-if="isactive" name="pic-active">
      </slot>
    </div>
    <div class="txt">
      <slot name="txt"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ddf',
  data() {
    return {
      // isactive: false
    }
  },
  props: {
    path: {
      type: String
    },
  },
  computed: {
    isactive () {
      return this.path.indexOf (this.$route.path) != -1
    }
  },

  components: {},

  methods: {
    handleRedir () {
      this.$router.replace(this.path)
    }
  }
}

</script>
<style  scoped>
.tabbaritem {
  flex: 1;
}
</style>