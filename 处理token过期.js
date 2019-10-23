/**
 * 把 axios 相关操作封装到此模块中
 * 需要发请求的地方去加载使用
 */

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://192.168.30.128:8090/'
  baseURL: 'http://ttapi.research.itcast.cn'
})

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 配置不使用axios默认json.parse去处理后端响应回来的jsjon字符串
request.defaults.transformResponse = [(data) => {
  try {
    return JSONBig.parse(data)
  } catch (e) {
    return data
  }
}]

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, async function (error) {
  const { user } = store.state
  // Do something with response error
  if (error.response && error.response.status === 401) {
    // 是否有 refresh_token，没有直接跳转登录页
    if (!user.refresh_token) {
      router.push({
        name: 'login'
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

export default request
