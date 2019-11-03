<template>
  <div class="classuse"></div>
</template>

<script>
import { Goods } from './index'
export default {
  created () {
    const goods = new Goods({ age: 45, love: 'mnan', title: 30, name: 'zhangsna' }, 4, 8);
    console.log(goods);
  },
}
</script>

<style>
</style>