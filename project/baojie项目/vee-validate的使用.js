npm i veevalidate


import VeeValidate from 'vee-validate';
vue.use(veevalidate)


直接使用自定义指令 vee-validate="校验规则"， 必须指定name属性

v-validate="{required: true, max: 6, min: 4}" name="cno"

给父元素一个error属性 error: errors.has('cno')   

然后添加error类， .error{font-size: 16px; color: #f00};


demo

<div :class="{error: errors.has('pwd')}"> // 看看errors里面是否有pwd， 有的话添加error类名
	<label for="password"></label>
	<input id="password" name="pwd">
</div>
.errors {
	color: #f00;
}

登录前校验：
通过this.errors.any() 来判断是否有错，
if (this.errors.any()) {
	return conosle.log('有错误')
}


通过this.$validator.validate(); 强制执行校验