Vue.prototype.$isLogin = () => {
  // 校验登录状态, 使用后的时候直接this.$isLogin()即可, 也可以直接在组件中使用 $isLogin()

   // 如果没有登录，则跳转到登录页
  if (!store.state.user) { // 这是之前将用户登录的信息存储在store里面的
    router.push({
      name: 'login'
    })
    return false
  }

   // 如果登录了执行后续逻辑操作
  return true
}