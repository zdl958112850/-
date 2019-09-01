import request from '@/utils/request'

 export const login = ({ mobile, code }) => {
  // ָ�������߼�
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}



// ------------------����ģ����ʹ��----------------------------
async handleLogin () {
  const data = await login({
    mobile: this.mobile,
    code: this.code
  })
}