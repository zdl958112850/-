<template>
  <div class="about">
    <h1>This idemoooooooe</h1>
    <button @click="$router.push('/')">去首页</button>
  </div>
</template>


<script>
export default {
  data () {
    return {
      refresh: true,
      enterPath: '',
      flag: false
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   // if (to.path == from.path) {

  //   //   }
  //   next(vm => {
  //     // console.log(vm)
  //     // vm.$router.go(-1)
  //     vm.enterPath = from.path;
  //   });
  // },
  // beforeRouteLeave (to, from, next) {
  //   // console.log(vm);
  //   console.log("TCL: beforeRouteLeave -> to.path", to.path)
  //   console.log("TCL: beforeRouteLeave -> this.enterPath", this.enterPath)

  //   // next(vm => {
  //   //   },
  //   if (to.path == this.enterPath) {
  //     // vm.go()
  //     if (this.flag) {
  //       return next();
  //     }
  //     this.flag = true;
  //     this.$router.go(-1);
  //     console.log('xia来了')
  //     window.location.replace('#/')
  //   }
  //   next();
  // },
  methods: {},
}
</script>
