vuex 中

state: {
	LoginUser: sessionStorage.getItem('LoginUser') ? Json.parse(sessionStorage.getItem('LoginUser')) : null
},
// 刷新之后， vuex中的数据都会清空， 把当前用户登录的信息放到sessionStorage里面
mutations: {
	initUser(state, palyload){
		state.LoginUser= playload;
	}
},
actions: {},
getters: {
	getLoginUser(state) {
		return state.LoginUser;
	}
}

// 处理没有登录直接跳转到登录页面