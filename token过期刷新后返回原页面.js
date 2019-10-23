// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, async function (error) {
  const { user } = store.state
  // Do something with response error
  if (error.response && error.response.status === 401) {
    // 是否有 refresh_token，没有直接跳转登录页
    if (!user || !user.refresh_token) {
      // 在 JavaScript 模块中获取当前路由对象
      // 如果是 a 页面，那么 currentRoute 就是 a 页面的 $route
      // 如果是 n 页面，那么 currentRoute 就是 n 页面的 $route
      console.log(router.currentRoute)
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    } else {
      // 如果有，请求获取新的 token，存储到容器中
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 将请求到的新的 token 更新到容器中
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })

      console.log(error.config)

      // 把原来失败的请求继续发出去
      return request(error.config)
    }
  }
  return Promise.reject(error)
})