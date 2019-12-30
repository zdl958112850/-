<template>
  <div class="workmonitor">
    <top-control :history="historyArr" :btnArr="btnArr"></top-control>
    <div class="workcon">
      <FilterCondition
        ref="filtercon"
        @getFirstOrg="getFirstOrg"
        @exportData="handleExport"
        @queryData="queryData"
        class="filter"
        :type="type"
      />
      <WorkInfo :workHead="workHead" class="workinfo" />

      <!-- <div class="table">
        <i-table :content="self" border :columns="columns1" :data="list"></i-table>
      </div>-->
      <div class="itable">
        <ITable ref="itable" :isCar="false" :data1="list" />
      </div>
      <div class="paging">
        <Page
          :page-size="10"
          :total="total"
          :current="filterData.page"
          show-elevator
          show-total
          :disabled="disabled"
          @on-change="onPageChange"
        ></Page>
        <!-- <PagationPage @goQuery="goQuery" ref="paga" class="pagation" /> -->
      </div>
      <!-- <div class="info">
        <div class="carinfo">
          <div class="left">
            <div class="pic clearfix">
              <div class="img">
                <img src="@/views/AgrPages/Component/MachineInfoPlan/images/monitor_09.jpg" alt="">
                
              </div>

              <div class="text">
                <div class="item">
                  农机： 东方红LX1304
                </div>
                <div class="item">
                  车主： 葛绪祖 15594060236
                </div>
                <div class="item">
                  单位： 甘肃省-张掖市-民乐...
                </div>
              </div>
            </div>
            <div class="text-con">
              <div class="text">
                <div class="item">
                  车牌号码： 甘07-73857
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="pic clearfix">
              <div class="img">
                <img src="@/views/AgrPages/Component/MachineInfoPlan/images/monitor_11.jpg" alt="">
                
              </div>

              <div class="text">
                <div class="item">
                  设备号： 10001C4C
                </div>
                <div class="item">
                  作业类型： 播种作业
                </div>
                <div class="item">
                  作业面积： 3.13 亩
                </div>
              </div>
            </div>
            <div class="text-con">
              <div class="text">
                <div class="item">
                  作业日期： 2019-10-09
                </div>
                <div class="item">
                  测量点数： 458 个
                </div>
                <div class="item">
                  达标面积： 3.13 亩
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>-->

      <!-- <LeftPlotInfo class="leftplotinfo" /> -->
      <!-- <div class="mapdiv">
        <TMap  :checkbox="false" :planInfo="false" ref="tmap" :list="list" class="map" />
      </div>-->
    </div>
  </div>
</template>

<script>
import { queryRotationList } from "@/api/AgrApi/statistics";
import ITable from "@/views/AgrPages/Component/ITable/ITable";

import ImgPreDown from "@/views/AgrPages/Component/ImgPreDown/ImgPreDown";
import MachineInfoPlan from "@/views/AgrPages/Component/MachineInfoPlan/MachineInfoPlan";
import PlanInfo from "@/views/AgrPages/Component/PlanInfo/PlanInfo";
import TopControl from "@/views/AgrPages/Component/TopControl";
import Orgaization from "@/views/AgrPages/MachineSurvey/ChildComponent/Orgaization";
import TotalCar from "@/views/AgrPages/MachineSurvey/ChildComponent/TotalCar";
import CarDetail from "@/views/AgrPages/MachineSurvey/ChildComponent/CarDetail";
// import TMap from "@/views/AgrPages/Component/Map/Map";
import FilterCondition from "@/views/AgrPages/Component/FilterCondition/FilterCondition";
import WorkInfo from "@/views/AgrPages/Component/WorkInfo/WorkInfo";
import LeftPlotInfo from "@/views/AgrPages/Component/LeftPlotInfo/LeftPlotInfo";
import { queryAgriculturalMachinery } from "@/api/AgrApi/gaikuang";
import PagationPage from "@/views/AgrPages/Component/PagationPage";

export default {
  name: "workmonitor",

  components: {
    TopControl,
    Orgaization,
    TotalCar,
    CarDetail,
    PagationPage,
    // TMap,
    PlanInfo,
    MachineInfoPlan,
    ImgPreDown,
    FilterCondition,
    WorkInfo,
    LeftPlotInfo,
    ITable
  },

  data() {
    return {
      org: "",
      total: 1,
      disabled: false,
      self: this,
      type: undefined,
      historyArr: [
        {
          name: "首页",
          path: "/game/agrindex"
        },
        {
          name: "作业监测",
          path: "/game/workmonitor"
        }
      ],
      btnArr: [
        {
          name: "区域作业",
          path: "/game/workmonitor"
        },
        {
          name: "跨区作业",
          path: "/game/workmonitor?type=kuaqu"
        }
      ],
      list: [],
      workHead: {
        workArea: "0",
        standardArea: "0",
        repeatArea: "0",
        lostArea: "0"
      },
      columns1: [
        {
          title: "单位",
          align: "center",
          key: "orgName"
        },
        {
          title: "作业类型",
          align: "center",
          key: "typeName"
        },
        {
          title: "作业时间",
          align: "center",
          key: "workDay"
        },
        {
          title: "设备号",
          align: "center",
          key: "orgName"
        },
        {
          title: "作业面积",
          align: "center",
          key: "workArea"
        },
        {
          title: "达标面积",
          align: "center",
          key: "standardArea"
        },
        {
          title: "重复面积",
          align: "center",
          key: "repeatArea"
        },
        {
          title: "达标比率",
          align: "center",
          key: "workRatio"
        },
        {
          title: "平均深度",
          align: "center",
          key: "avgdeep"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginTop: "10px",
                    display: "inline-block"
                  }
                },
                "审核未通过"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    width: "80%",
                    display: "flex",
                    "justify-content": "center"
                  },
                  on: {
                    click: () => {
                      alert("审核未通过");
                    }
                  }
                },
                "查看原因"
              )
            ]);
          }
        }
      ],
      change: false,
      data1: [
        {
          agrId: 5,
          attr1: "01",
          avgdeep: 24,
          lostArea: "2.00",
          location: 22933,
          orgName: "索镇街道",
          regName: "索镇街道",
          remarks: null,
          repeatArea: 32.84,
          standardArea: "10.00",
          terminalNo: "20183166345",
          typeName: "深松深耕",
          workArea: "91.00",
          workDay: "2019-11-25",
          workId: 22,
          workObject: 54,
          workPlace: "淄博市新建东路379西北约666米",
          workRatio: 0.984,
          workType: 296,
          action: 35
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗"
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道"
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道"
        }
      ],
      filterData: {
        workStartTime: "", // 开始时间
        workEndTime: "", // 结束时间
        location: "", // 所选组织id
        keyWord: "", // 关键字（设备号，车牌号，机主姓名）
        workType: "", // 作业类型
        page: 1, //	页码
        pageSize: 10 //	每页条数
      }
    };
  },
  watch: {
    "$route.fullPath"() {
      this.type = this.$getQuery().type;
    },
    type() {
      /**切换的时候将change置为true */
      if (this.type == "kuaqu") {
        this.filterData = {};
        this.filterData.page = 1;
        this.filterData.pageSize = 10;
        this.filterData.location = "";
      } else {
        this.filterData = {};
        this.filterData.page = 1;
        this.filterData.pageSize = 10;
        this.filterData.location = this.org;
      }
      // this.$refs.paga.initPage();
      this.$refs.filtercon.initData();
      this.queryRotationList();
    }
  },
  computed: {},
  created() {},
  methods: {
    /**
     * 获取第一次组织
     */
    getFirstOrg(v) {
      this.org = v;
      this.filterData.location = v;
      this.queryRotationList();
    },
    /**
     * 分页查询
     */
    onPageChange(currentPage) {
      /**当前页 */
      this.filterData.page = currentPage;
      this.queryRotationList();
    },
    /**
     * 导出数据
     */
    handleExport() {
      // console.log("导出");
      let type = this.$getQuery().type;
      if (type == "kuaqu") {
        this.$refs.itable.exportCityData("跨区作业", this.filterData);
        // console.log("TCL: handleExport -> this.filterData", this.filterData)
      } else {
        this.$refs.itable.exportCityData("区域作业", this.filterData);
      }
    },
    /**
     * 点击查询
     */
    async queryData(filterdata) {
      /**判断类型 */
      let type = this.$getQuery().type;
      console.log("TCL: queryData -> type", type);
      // this.$refs.paga.initPage();
      this.filterData = filterdata;
      this.filterData.pageSize = 10;
      this.filterData.page = 1;
      if (type == "kuaqu") {
        /**如果跨区就将location清除掉 */
        this.filterData.location = "";
      } else {
        /**区域查询, 如果没有所在位置提示 */
        // this.filterData.location || this.$Message.info('请选择所在区域!')
        if (!this.filterData.location) {
          return this.$Message.info("请选择所在区域!");
        }
      }
      await this.queryRotationList();
      this.$Message.info("查询成功!");
    },
    /**
     * 获取列表
     */
    async queryRotationList() {
      // this.$Spin.show();
      this.$refs.itable.loading = true;

      let type = this.$getQuery().type;
      if (type == "kuaqu") {
        /**如果跨区就将location清除掉 */
        this.filterData.location = "";
      }

      let res;
      let activeType =  this.$getQuery().type;
      try {
        this.disabled = true;
        res = await queryRotationList(this.filterData);
      } catch (err) {}
      
      /**如果没有数据 */
      this.disabled = false;
      if (res.code == 777) {
        this.total = 0;
        // this.$refs.paga.totalNum = 1;
        this.list = []
        return;
      }

      /**顶部信息 */
      this.workHead = res.workHead;
      if (this.type == activeType) {
        /* 在发送前记录该activeType, 如果当前的类型和发送前的一直, 就赋值, */
        setTimeout(() => {
          this.disabled = false;
          this.$refs.itable.loading = false;
          this.change = false;
      }, 500);
        this.list = res.workList;
        this.total = res.total;
      }
      
      // this.list.forEach((item, index) => {
      //   item.option = "render (row, column, index) {return 11}"
      // })
      // console.log(res.workList);
      // this.$refs.paga.pageSize = 10;
      // this.$refs.paga.totalNum = res.total;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "@/styles/basefunction.scss";

.workcon {
  padding-top: 84px;
  padding-left: 20px;
  padding-right: 20px;
}

.leftplotinfo {
  margin-left: 20px;
  margin-top: 20px;
  width: 295px;
  height: 743px;
  float: left;
  margin-right: 20px;
}

.mapdiv {
  width: 1512px;
  height: 743px;
  float: left;
  margin-top: 20px;
}

.info {
  margin-left: 20px;
  height: 120px;
  width: 1836px;
  .left,
  .right {
    width: 913px;
    height: 120px;
    background-color: #fff;
    @extend %f148;
    padding: 10px;
    float: left;
    .pic {
      width: 456px;
      float: left;
      border-right: 1px solid #eee;
      .img {
        width: 100px;
        height: 100px;
        float: left;
      }
      .text {
        float: left;
        margin-left: 42px;
        line-height: 32px;
      }
    }
    .text-con {
      //background-color: #f0f;
      float: left;
      .text {
        float: left;
        margin-left: 42px;
        line-height: 32px;
      }
    }
  }
  .right {
    float: right;
  }
}

.workinfo {
  margin-top: 20px;
  height: 90px;
  width: 1826px;
}

.table {
  margin-top: 20px;
  // margin-left: 20px;
  width: 1825px;
  ::v-deep {
    .ivu-table th {
      background-color: #0fa5a0;
      color: #fff;
    }
  }
}
.filter {
  width: 1825px;
}
.itable {
  padding: 20px 0;
  width: 1825px;
  ::v-deep {
    .ivu-table th {
      background-color: #0fa5a0;
      color: #fff;
    }
  }
}
.page {
  text-align: center;
  margin: 20px auto;
  height: 34px;
  .pagation {
    margin: 0 auto;
  }
}
.paging::v-deep {
  padding: 40px 0;
  text-align: center;
  .ivu-page-next,
  .ivu-page-prev {
    width: 34px;
    height: 34px;
    line-height: 32px;
    border-color: #d2d2d2;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .ivu-page-total {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    color: #646464;
  }
  .ivu-page-item {
    height: 34px;
    line-height: 32px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    border-color: #d2d2d2;
    font-size: 14px;
    color: #646464;
  }
  .ivu-page-item-active,
  .ivu-page-item:hover {
    background-color: #13b5b1;
    border-color: #13b5b1;
    a {
      color: #ffffff;
    }
  }
  .ivu-page-options-elevator {
    height: 34px;
    line-height: 32px;
    font-size: 14px;
    color: #646464;
    box-sizing: border-box;
    input,
    input:hover {
      border-color: #d2d2d2;
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
