<!-- 多选框和v-mode的使用 -->
    <label for="female">
      <input type="checkbox"  value="女" v-model="checkboxArr" name="" id="female"> 女
    </label>
    <label for="male">
      <input type="checkbox" value="男" v-model="checkboxArr"  name="" id="male"> 男
    </label>
    您的爱好是 {{checkboxArr}}