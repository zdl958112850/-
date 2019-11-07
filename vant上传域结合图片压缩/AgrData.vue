<template>
  <div class="agrdata">
    <!-- 头部 -->
    <Header>
      <div slot="title">我的资料</div>

      <div slot="more"></div>
    </Header>

    <div class="message">
      <ul>
        <li>
          <div class="con">
            <span>头像</span>
            <div class="more">
              <van-uploader
                class="wl-info"
                v-model="userInfo.photo"
                multiple
                :max-count="1"
                :max-size="1024 * 100"
                @oversize="overSize"
              ></van-uploader>
            </div>
          </div>
        </li>
        <li>
          <div class="con">
            <span>手机号码</span>
            <div class="more">
              <input type="tel" maxlength="11" v-model="userInfo.mobile" placeholder="请输入手机号码" />
            </div>
          </div>
        </li>
        <li>
          <div class="con">
            <span>昵称:</span>
            <div class="more">
              <input type="text" placeholder="请输入昵称" v-model="userInfo.userName" />
            </div>
          </div>
        </li>
        <!-- <li>
                    <div class="con">
                        <span>性别：</span>
                        <div class="more">
                            <div class="radio">
                                <div class="radio-item" v-for="item in sexArr" :key="item.id"
                                     :class="{'select': userInfo.userSex == item.id}" @click="radioTarget(item.id)">
                                    <div class="circle"></div>
                                    <span>{{item.name}}</span>
                                </div>
                            </div>

                        </div>

                    </div>
        </li>-->
        <!-- <li @click="timeType = true">
                    <div class="con">
                        <span>出生年月：</span>
                        <div class="more">{{userInfo.attr2 == null?"请选择日期":userInfo.attr2}}</div>
                    </div>
        </li>-->
        <li>
          <div class="con">
            <span>农业局名称：</span>
            <div class="more">{{userInfo.orgName}}</div>
            <!-- <input type="text" placeholder="请输入昵称" v-model="userInfo.orgName"> -->
          </div>
        </li>
        <li>
          <div class="con">
            <span>农业局所在位置：</span>
            <div class="more">{{userInfo.companyAddress}}</div>
          </div>
        </li>
        <!-- <li>
                    <div class="con">
                        <span>家庭住址：</span>
                        <div class="more">
                            <input type="text" placeholder="请输入家庭住址" v-model="userInfo.areaAddress">

                        </div>
                    </div>
        </li>-->
      </ul>
    </div>

    <van-popup position="bottom" v-model="timeType">
      <van-datetime-picker
        @confirm="handleSelectBeginTime"
        @cancel="timeType = false"
        v-model="selectTime"
        :min-date="minDate"
        @change="handleChangeTime"
        type="date"
      ></van-datetime-picker>
    </van-popup>
    <!-- 底部按钮 -->
    <div class="save" @click="onSubmitCheck">保存提交</div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import {
  GET_PERSONAL_INFORMATION,
  MODIFY_PERSONAL_INFORMATION
} from "@/utils/user";
import { formatDate } from "@/utils/formatDate";
import Vue from "vue";
import { Toast } from "vant";
import { base64Image } from "@/utils/imageCompression";

import { RadioGroup, Radio } from "vant";
import { Uploader } from "vant";

Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Uploader);
Vue.use(Toast);

export default {
  name: "agrdata",
  //  `data
  data() {
    return {
      userInfo: {
        photo: [],
        mobile: "",
        userName: "",
        userSex: 1,
        attr2: "",
        areaAddress: "",
        trueName: "",
        idcard: ""
      },
      timeType: false,
      minDate: new Date("1970-01-01"),
      selectTime: new Date(),
      sexArr: [
        {
          name: "男",
          id: 1
        },
        {
          name: "女",
          id: 2
        }
      ],
      isConnect: false
    };
  },

  components: { Header },
  created() {
    this._getInfo();
  },
  methods: {
    /**
     * 上传图片大于100kb时触发的方法
     * @param file
     */
    overSize(file) {
      base64Image({
        width: 750,
        ratio: 0.75,
        file: file.content,
        callback: imageUrl => {
          this.userInfo.photo.push({ content: imageUrl });
        }
      });
    },
    /**
     * 获得个人信息
     * @private
     */
    _getInfo() {
      GET_PERSONAL_INFORMATION().then(re => {
        this.userInfo = re;
        console.log(re);
        this.userInfo["photo"] = this.filterPhone(re.photo);
      });
    },
    /**
     * 时间确定
     */
    handleSelectBeginTime() {
      this.timeType = false;
      if (this.selectTime) {
        this.userInfo.attr2 = formatDate(
          new Date(this.selectTime),
          "yyyy-MM-dd"
        );
      }
    },
    /**
     * 处理日期改变
     */
    handleChangeTime() {
      if (this.selectTime) {
        this.userInfo.attr2 = formatDate(
          new Date(this.selectTime),
          "yyyy-MM-dd"
        );
      }
    },
    /**
     * 单选切换
     * @param id
     */
    radioTarget(id) {
      this.userInfo.userSex = id;
    },
    /**
     * 图片过滤
     * @param val
     */
    filterPhone(val) {
      if (val) {
        return [{ content: val }];
      }
      return [];
    },
    /**
     * 判断是否为空
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (
        typeof obj === "undefined" ||
        obj == null ||
        obj === "" ||
        obj.length === 0
      ) {
        return true;
      }
      return false;
    },
    /**
     * 提交前验证
     * @returns {VanToast}
     */
    onSubmitCheck() {
      if (this.isEmpty(this.userInfo.photo)) {
        return Toast("请上传头像");
      }
      if (this.isEmpty(this.userInfo.mobile)) {
        return Toast("请输入手机号码");
      }
      if (this.isEmpty(this.userInfo.userName)) {
        return Toast("请输入昵称");
      }
      if (!this.$handleMobile(this.userInfo.mobile)) {
        return;
      }
      let param = {
        photo: this.userInfo.photo[0].content,
        mobile: this.userInfo.mobile,
        userName: this.userInfo.userName,
        userSex: this.userInfo.userSex,
        attr2: this.userInfo.attr2,
        areaAddress: this.userInfo.areaAddress
      };
      this.onSubmit(param);
    },
    /**
     * 提交
     * @param param
     */
    onSubmit(param) {
      if (this.isConnect) return;
      this.isConnect = true;
      MODIFY_PERSONAL_INFORMATION(param).then(re => {
        this.isConnect = false;
        if (re.success) {
          this.$router.back(-1);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mydata {
  font-size: 28px;
  padding-top: 130px;
  padding-bottom: 140px;
  background-color: #f4f4f4;
}

.mydata ul {
  //   background-color: #fff;
}

.message {
  padding-top: 130px;
  ul {
    li {
      background-color: #fff;
      padding: 0 25px;
      &:last-child {
        .con {
          border: none;
        }
      }
      .con {
        display: flex;
        height: 90px;
        align-items: center;
        border-bottom: 1px solid #efefef;
        justify-content: space-between;
        &.photo {
          height: 200px;
        }
      }
      span {
        font-size: 28px;
        color: #595959;
      }
      .more {
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
        font-size: 24px;
        color: #8c8c8c;
        .icon-youjiantou {
          margin-left: 20px;
          font-size: 28px;
        }
        .pic {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        input {
          width: 100%;
          height: 90%;
          text-align: right;
          border: none;
          color: #8c8c8c;
        }
        .radio {
          display: flex;
          align-items: center;
          justify-content: center;
          .radio-item {
            display: flex;
            margin-right: 25px;
            align-items: center;
            justify-content: center;
            &:last-child {
              margin-right: 0;
            }
            &.select {
              .circle {
                position: relative;
                border-color: #14c4a6;
                &:before {
                  position: absolute;
                  width: 8px;
                  height: 15px;
                  top: 2px;
                  left: 7.5px;
                  border-color: #14c4a6;
                  border-style: solid;
                  border-width: 0 2px 2px 0;
                  transform: rotate(45deg);
                  content: "";
                }
              }
            }
            .circle {
              flex: 0 0 30px;
              width: 30px;
              height: 30px;
              margin-right: 20px;
              box-sizing: border-box;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              border: 2px solid #f4f4f4;
            }
            span {
              font-size: 24px;
              color: #8c8c8c;
            }
          }
        }
      }
    }
  }
  .real {
    margin-top: 10px;
  }
}

/* 保存提交 */
.save {
  position: fixed;
  text-align: center;
  line-height: 110px;
  background-color: #0cabf4;
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
}
.agrdata /deep/ .header {
  // background-image: #0cabf4 !important;
  background-image: linear-gradient(90deg, #0cabf4 0%, #0cabf4 100%),
    linear-gradient(#0cabf4, #0cabf4);
}
</style>