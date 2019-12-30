/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-12-05 11:31:10 
 * @Last Modified by: zhangdl
 * @Last Modified time: 2019-12-05 11:59:17
 */ 
/**
 * 处理类型车辆简化
 */
export class Goods {
  constructor(dictArr) {
    let resArray = [];
    dictArr.forEach((item, index) => {
      resArray.push({
        value: item.dictId,
        label: item.dictName,
      })
    })
    this.dictArr = resArray;
  }
}
