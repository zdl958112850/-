.bablelrc 是bable6 现在都是卸载 babel.config.js 里面的babel7

router.beforeEach((to, from, next) => {
	if(to.path != "/") { // 如果不是去登录地址， 校验用户是否登录
		if (store.getters.getLoginUser()) next();// 如果里面有值就直接next, 如果登录了就让他去， 没有登录直接跳转到首页
		return next("/")			
	}
	next()
})