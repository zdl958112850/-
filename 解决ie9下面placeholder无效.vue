<template>
  <div class="infofill">
    <Frame :shape="3" class="box">
      <div class="tab-title">
        <span @click="handleTab(0)" :class="{'active': active==0}">录入考生信息</span>
        <span @click="handleTab(1)" :class="{'active': active==1}">读取考生信息</span>
      </div>
      <div v-show="active == 0" class="tab-con">
        <div v-for="(item,  index) in arr" class="item" :key="index">
          <div class="label">{{item.label}}</div>
           <!-- v-model="item.value"  -->
          <input v-if="item.placeholder" type="text" :placeholder="item.placeholder" />
          <div class="item-check" v-else>
            <span v-for="(it, i) in item.arr" :key="i" class="check">
              <i class="un-select" :class="{'select': it.value}"></i>
              {{it.label}}
            </span>
          </div>
        </div>
      </div>
      <div v-show="active == 1" class="tab-con">
        <div class="pic">
          <img src="@i/forward.png" alt />
          <p>请刷身份证读取考生信息</p>
        </div>
      </div>
      <div v-show="active == 0" class="btn">
        <span>重置</span>
        <span>完成</span>
      </div>
      <div v-show="active == 1" class="btn">
        <span class="sure">确定读取</span>
      </div>
    </Frame>
  </div>
</template>

<script>
export default {
  name: "infofill",

  components: {},
  data() {
    return {
      active: 0, // 顶部tab
      arr: [
        {
          label: "考生姓名:",
          value: "",
          placeholder: "请输入考生姓名"
        },
        {
          label: "身份证号:",
          value: "",
          placeholder: "请输入身份证号"
        },
        {
          label: "性别:",
          arr: [
            {
              label: "男",
              value: true
            },
            {
              label: "女",
              value: false
            }
          ]
        },
        {
          label: "考试机型:",
          value: "",
          arr: [
            {
              label: "G1",
              value: false
            },
            {
              label: "G2",
              value: false
            },
            {
              label: "G3",
              value: true
            }
          ]
        },
        {
          label: "报考类别:",
          value: "",
          arr: [
            {
              label: "初次申领考试",
              value: false
            },
            {
              label: "增驾考试",
              value: false
            },
            {
              label: "违法记分考试",
              value: true
            }
          ]
        },
        {
          label: "考试次数:",
          value: "",
          placeholder: "请输入考试次数"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {
    var _this = this;
    if (document.all) {
      /**ie */
      console.log("TCL: mounted -> /**ie */", /**ie */)
      
      let input = document.querySelectorAll("input");
      input.forEach((item, index) => {
        var placeholderValue;
        placeholderValue = item.getAttribute("placeholder"); //缓存默认的placeholder值
        item.value = placeholderValue;
        item.addEventListener("focus", () => {
          item.value == placeholderValue ? item.value = "" : '';
        });
        item.addEventListener("blur", () => {
          item.value == "" ? item.value = placeholderValue : "";
        });
      });
    }
  },
  methods: {
    /**
     * tab切换
     */
    handleTab(val) {
      this.active = val;
    }
  }
};
</script>

<style scoped lang='less'>
.infofill {
  padding: 3.6vw 0vw;
  width: 100%;
  .box {
    width: 37.76vw;
    height: 32.71vw;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .fz14m;
    padding: 1.88vw 3.7vw;
    .tab-title {
      height: 3.75vw;
      span {
        .cur;
        background-color: #233978;
        width: 14.58vw;
        line-height: 2.71vw;
        border-radius: 3px;
        text-align: center;
        height: 2.71vw;
        float: left;
        &:last-child {
          float: right;
        }
      }
    }
    .tab-con {
      width: 100%;
      .pic {
        background: #191440;
        text-align: center;
        width: 100%;
        height: 21vw;
        margin-bottom: 1vw;
        img {
          margin: 3.5vw auto 0;
          width: 15.3vw;
          margin-bottom: 1vw;
          height: 10.4vw;
        }
      }
      .item {
        background-color: #2b2956;

        height: 2.71vw;
        line-height: 2.71vw;
        position: relative;
        margin-bottom: 1.09vw;

        .label {
          position: absolute;
          left: 20px;
          top: 0;
        }
        .item-check {
          padding-left: 110px;
        }
        .check {
          margin-right: 20px;
          .un-select {
            display: inline-block;
            width: 13px;
            height: 13px;
            border-radius: 3px;
            border: solid 1px #4dd3d5;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
        input {
          height: 2.71vw;
        line-height: 2.71vw;
          padding-left: 110px;
          border-radius: 3px;
          width: 100%;
          &::placeholder {
            .fz14m;
          }
        }
      }
    }
    .btn {
      width: 100%;
      .sure {
        width: 100%;
      }
      span {
        .cur;
        float: left;
        background-color: #233978;
        width: 14.58vw;
        border-radius: 3px;
        height: 2.71vw;
        line-height: 2.71vw;
        text-align: center;
        &:active {
          color: #fff;
          background-image: linear-gradient(0deg, #0f3b83 0%, #24b4af 100%),
            linear-gradient(#0c6d9b, #0c6d9b) !important;
        }
        &:last-child {
          float: right;
        }
      }
    }
  }
}
.active {
  background-image: linear-gradient(0deg, #0f3b83 0%, #24b4af 100%),
    linear-gradient(#0c6d9b, #0c6d9b) !important;
}
.select {
  background-color: #4dd3d5;
}
</style>
