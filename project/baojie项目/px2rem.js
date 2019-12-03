
px2rem.scss 文件中写
@function px2rem($px) {
	@return $px*320/$designWidth/20 + rem;
}
$designWidth: 750;

引入， 然后通过 px2rem(375)就可以得到一半的宽度