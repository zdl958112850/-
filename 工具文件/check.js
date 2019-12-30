// 手机号
let tel = /^1[3456789]\d{9}$/;
// 只能输入数字
let positiveInteger = /[^\d]/g;
// 密码
let password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
// 正整数
let positiveNumber = /^[0-9]*$/;
// 价格
let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
const CHECK = {
  // 手机号码正则
  isTel: function(val) {
    return tel.test(val);
  },
  // 为空验证
  isEmpty: function(obj) {
    return (
      typeof obj === "undefined" || obj == null || obj === "" || obj.length <= 0
    );
  },
  // 只能输入数字
  positiveInteger,
  // 密码正则
  isPassword: function(val) {
    return password.test(val);
  },
  // 正整数
  isPositiveNumber: function(val) {
    return positiveNumber.test(val);
  },
  // 价格
  isPriceReg: function(val) {
    return priceReg.test(val);
  },
  // 时间校验
  isTime: function(start, end) {
    return start.getTime() > end.getTime();
  }
};

export default CHECK;
