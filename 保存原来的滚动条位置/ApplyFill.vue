<template>
  <div ref="applyfill" class="applyfill">
    <!-- 头部 -->
    <Header>
      <div v-if="checkFail" slot="title">机手认证</div>
      <div v-else slot="title">申请填报</div>
      <div slot="more"></div>
    </Header>
    <!-- <div class="left"><i class="iconfont icon-left"></i></div> -->

    <!-- 审核状态 -->
    <div v-if="checkFail" class="vertifing">
      <div class="iconfont icon-shijian1"></div>
      <div class="txt">
        <p>审核失败!</p>
        <span>审核失败, 请重新提交审核!</span>
      </div>
      <!-- <div v-if="type == 1" class="txt">
        <p>已审核</p>
        <span>恭喜您! 农机已经通过审核!</span>
      </div>-->
      <!-- <div v-if="type == 2" class="txt">
        <p>已完成</p>
        <span>作业已完成</span>
      </div>
      <div v-if="type == 3" class="txt">
        <p>其他</p>
        <span>其余作业</span>
      </div>-->
    </div>

    <!-- 机手信息 -->

    <div :style="{paddingTop: checkFail ? '70px': ''}" class="machinistInfo">
      <ul>
        <li class="title">
          <span>机手信息</span>
          <div></div>
        </li>
        <li>
          <span>姓名:</span>
          <div>
            <input v-model="macName" type="text" placeholder="请输入姓名" />
          </div>
        </li>
        <!-- <li><span>身份证:</span><div><input v-model="" type="text" placeholder="请输入身份证"></div></li> -->
        <li>
          <span>电话:</span>
          <div>
            <input v-model="telephone" type="text" placeholder="请输入电话" />
          </div>
        </li>
      </ul>
    </div>

    <!-- 驾驶证上传 -->
    <div class="upload">
      <div class="title">
        驾驶证照片
        <span>(上传本人驾驶证正反面)</span>
      </div>
      <div class="driveLice">
        <div class="forword">
          <van-uploader
            @click-preview="openPic"
            @close-preview="closePic"
            :max-size="1024 * 100"
            @oversize="overSizePositive"
            capture
            :max-count="1"
            v-model="fileList1"
          />
        </div>
        <div class="backword">
          <van-uploader
            @click-preview="openPic"
            @close-preview="closePic"
            :max-size="1024 * 100"
            @oversize="overSizeObverse"
            capture
            :max-count="1"
            v-model="fileList2"
          />
        </div>
      </div>
    </div>

    <!-- 身份证上传 
    <div class="upload">
      <div class="title">
        身份证照片
        <span>(上传本人身份证正反面)</span>
      </div>
      <div class="driveLice">
        <div class="forword">
          <van-uploader capture :max-count="1" v-model="fileList3" />
        </div>
        <div class="backword">
          <van-uploader capture :max-count="1" v-model="fileList4" />
        </div>
      </div>
    </div>
    -->
    <!-- 底部按钮 -->
    <div v-if="checkFail" @click="updataExamine" class="apply">重新审核</div>
    <div v-else @click="apply" class="apply">立即申请</div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Vue from "vue";
import { Uploader } from "vant";
import { updataExamine } from "@/utils/applyfill";
import { attestation } from "@/utils/applyfill";
import { examine } from "@/utils/applyfill";
import { base64Image } from "@/utils/imageCompression";
import { mapState } from "vuex";

Vue.use(Uploader);
export default {
  name: "applyfill",
  //  `data
  data() {
    return {
      fileList1: [],
      fileList2: [
        // { url: 'https://cloud-image', isImage: true }
      ],
      fileList3: [
        // { url: 'https://cloud-image', isImage: true }
      ],
      fileList4: [],
      drivingpic: null, // 驾驶证照片
      macName: null, // 机手名称
      telephone: "", // 联系电话
      checkFail: false, // 审核失败
      isPicShow: false
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.isPicShow);
    if (this.isPicShow) {
      // this.$refs["upload1"].closeImagePreview();
      next(false);
      return;
    }
    next();
  },
  created() {
    this.getStatus();
  },
  mounted() {
    this.$refs["applyfill"].addEventListener(
      "scroll",
      this.recordScrollPosition
    ); //添加绑定事件
  },
  components: { Header },
  computed: {
    ...mapState([
      "list_top" //vuex中的存放的滚动条的位置
    ])
  },
  beforeDestroyed() {
    this.$refs["applyfill"].removeEventListener("scroll");
  },
  methods: {
    recordScrollPosition(e) {
      this.$store.commit("setListTop", e.target.scrollTop); //实时存入到vuex中
    },
    openPic() {
      this.isPicShow = true;
    },
    closePic() {
      this.$refs.applyfill.scrollTop = this.list_top;
      this.isPicShow = false;
    },
    /**
     * 上传图片大于100kb时触发的方法
     * @param file
     */
    overSizePositive(file) {
      base64Image({
        width: 750,
        ratio: 0.75,
        file: file.content,
        callback: imageUrl => {
          this.fileList1.push({ content: imageUrl });
        }
      });
    },
    /**
     * 上传图片大于100kb时触发的方法
     * @param file
     */
    overSizeObverse(file) {
      base64Image({
        width: 750,
        ratio: 0.75,
        file: file.content,
        callback: imageUrl => {
          this.fileList2.push({ content: imageUrl });
        }
      });
    },
    async apply() {
      this.drivingpic =
        this.fileList1[0].content + ",," + this.fileList2[0].content;
      try {
        var res = await attestation({
          macName: this.macName, //	机手名称
          telephone: this.telephone, //	联系电话
          sex: 1, //	性别（1 男  2 女）
          birthday: null, //	出生日期
          experience: null, //	从业年限
          education: null, //	学历
          remarks: null, //	工作经验
          drivingpic: this.drivingpic //	证件照片（地址）
        });
        console.log(res);
        if (res.success) {
          this.$toast(res.msg);
          this.$router.push("EmploymentInfo");
        } else {
          this.$toast(res.msg);
        }
      } catch (err) {
        this.$toast(res.msg);
      }
    },
    async updataExamine() {
      this.drivingpic =
        this.fileList1[0].content + ",," + this.fileList2[0].content;
      try {
        var res = await updataExamine({
          macName: this.macName, //	机手名称
          telephone: this.telephone, //	联系电话
          sex: 1, //	性别（1 男  2 女）
          birthday: null, //	出生日期
          experience: null, //	从业年限
          education: null, //	学历
          remarks: null, //	工作经验
          drivingpic: this.drivingpic //	证件照片（地址）
        });
        console.log(res);
        if (res.success) {
          this.$toast(res.msg);
          this.$router.push("EmploymentInfo");
        } else {
          this.$toast(res.msg);
        }
      } catch (err) {
        this.$toast(res.msg);
      }
    },
    /**查看机手认证状态 */
    async getStatus() {
      var res = await examine();
      // console.log(res);
      /**审核中 */
      if (res.attr5 == 0) {
        this.$router.push("/MachinistInfo?type=0");
      } else if (res.attr5 == 1) {
        // 审核通过
        this.$router.push("/MachinistInfo?type=1");
      } else if (res.attr5 == 2) {
        // 审核失败
        // this.$router.push('')
        this.checkFail = true;
        /**将数据拿过来 */
        console.log(res);
        this.macName = res.macName;
        this.telephone = res.telephone;
        this.fileList1.push({ content: res.file[0] });
        this.fileList2.push({ content: res.file[1] });
      }
    }
  }
};
</script>
<style scoped>
.applyfill {
  font-size: 28px;
  padding-top: 130px;
  background-color: #f4f4f4;
  padding-bottom: 140px;
}
.applyfill ul {
  background-color: #fff;
  padding: 0 25px;
}

.applyfill ul li {
  display: flex;
  line-height: 90px;
  height: 90px;
  color: #646464;
  border-bottom: 1px solid #efefef;
  justify-content: space-between;
}

.applyfill ul li input {
  height: 85px;
  line-height: 90px;
  text-align: right;
  border: 0;
  outline: none;
}

/* 标题 */
.title {
  font-weight: 700;
  font-size: 30px;
}

/* 驾驶证上传 */
.upload {
  padding: 0 25px;
  background-color: #fff;
  margin-top: 10px;
}
.upload .title {
  line-height: 90px;
  height: 90px;
  border-bottom: 1px solid #efefef;
}
.upload .title span {
  font-size: 28px;
  font-weight: normal;
  color: #16c4a3;
}
.upload .driveLice {
  display: flex;
  margin-top: 40px;
  padding-bottom: 50px;
  margin-bottom: 10px;
  justify-content: space-around;
}
.upload .driveLice .forword,
.upload .driveLice .backword {
  width: 230px;
  height: 150px;
}
.upload .driveLice .van-uploader {
  width: 100%;
}
.upload .driveLice /deep/ .van-uploader__upload {
  width: 100%;
  margin: 0;
}
.upload .driveLice /deep/ .van-uploader__preview {
  width: 100%;
  margin: 0;
}
.upload .driveLice /deep/ .van-uploader__preview-image {
  width: 100%;
}

/* 审核中 */
.vertifing {
  /* position: sticky; */
  position: absolute;
  height: 134px;
  top: 130px;
  left: 0;
  right: 0;
  z-index: 999;
  box-sizing: border-box;
  /* background-color: #10c6a5; */
  padding: 20px 25px;
  /* margin-bottom: 134px; */
  color: #fff;
  background-image: linear-gradient(90deg, #19e2b8 0%, #0dbd9f 100%),
    linear-gradient(#3aaf5a, #3aaf5a);
}

.vertifing .iconfont {
  float: left;
  width: 85px;
  height: 85px;
}

.vertifing .txt {
  float: left;
  line-height: 45px;
}

.vertifing span {
  font-size: 20px;
}
.icon-shijian1 {
  font-size: 70px;
  line-height: 70px;
  margin-top: 10px;
  margin-right: 40px;
  color: #fff;
}

/* 立即申请 */
.apply {
  position: fixed;
  text-align: center;
  line-height: 110px;
  background-color: #19ddb5;
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>