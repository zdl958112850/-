  activated () {
    console.log('activated')
  },


 deactivated () {
	// console.log('deactivated')
	 // 手动销毁当前实例，禁用缓存！！！
	this.$destroy()
},	