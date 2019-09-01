request.interceptors.response.use(function (response) {
  return response.data.data || response.data
}, async error => {
  if (error.response.status === 401) {
    // 看一下有没有 user（有 user 就有 refresh_token）
    const user = store.state.user

     // 如果连 user 都没有，则直接跳转登录页去登录
    if (!user) {
      router.push({
        name: 'login'
      })
      return
    }

     // 如果有 user，那我们请求接口使用 refresh_token 获取新的访问 token
    try {
      // 注意：请求获取刷线 token 不要使用 request, 使用 axios
      // 因为刷新 token 有她自己的处理流程
      // 如果你使用 request 的话，需要做更多的判断处理，会导致你分不清请求的流程了
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

       // 拿到新的登录令牌了
      // 更新用户 token
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })

       // 把本次因为 token 过期的请求继续发出去
      // 非刷新 token 的请求，使用 request 走我们的那个正常的请求拦截相关流程
      return request(error.config)
    } catch (refreshErr) {
      // 刷新 token 都请求失败，甭想了，直接去登录页
      router.push({
        name: 'login'
      })
    }
  }