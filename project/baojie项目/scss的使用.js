
定义变量
$act-active: #10234d;
$text-imp: 29px;


继承
%fz148: {
	font-size: 14px;
	color: #8c8c8c;
}

@extend %fz148;

混入
@mixin hwwrap {
	width: px2rem(174);
}
.lable {
	position: abosolute;
	@include hwwrap;
}