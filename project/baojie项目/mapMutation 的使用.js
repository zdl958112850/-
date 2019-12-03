import {mapMutation} from 'vuex'

methods: {
	...mapMutations(["initUser"]), // 将mutation里面的方法映射到组件里面
}