/**
创建于2019.11.1
用于弹出提示框
 */
<template>
  <div v-show="isShow" class="diag">
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="text">{{text}}</div>
      <div class="btn">
        <div @click="handleCancel" class="cancel">取消</div>
        <div @click="handleConfirm" class="confirm">确认</div>
      </div>
    </div>
    <div class="layer"></div>
  </div>
</template>

<script>
export default {
  name: 'diag',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    text: {
      type: String,
      default: '代码是写出来给人看的'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true,
    }
  },
  methods: {
    handleCancel () {
      // this.show = false;
      console.log('quxiaole')
      this.$emit('cancel')
    },
    handleConfirm () {
      // this.show = false;
      this.$emit('confirm')
    },
  }


}
</script>

<style lang="less" scoped>
.diag {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .content {
    z-index: 2;
    padding-top: 30px;
    width: 400px;
    height: 280px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    left: calc(50% - 200px);
    top: calc(50% - 150px);
    .title {
      text-align: center;
      font-size: 32px;
      color: #2d2d2d;
    }
    .text {
      font-size: 28px;
      color: #8c8c8c;
      padding: 30px 30px 20px;
    }
    .btn {
      position: absolute;
      bottom: 0px;
      // padding: 0 30px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ccc;
      .cancel,
      .confirm {
        text-align: center;
        flex: 1;
        height: 60px;
        line-height: 60px;
      }
      .confirm {
        border-left: 1px solid #ccc;
        color: #4040ff;
      }
    }
  }
  .layer {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>