
需要在vue.config.js中添加这句话
module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/variables.scss"`
			}
		}
	}
}