import request from '@/utils/request'

 export const login = ({ mobile, code }) => {
  // 指向其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}



// ------------------在在模板中使用----------------------------
async handleLogin () {
  const data = await login({
    mobile: this.mobile,
    code: this.code
  })
}