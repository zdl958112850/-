<template>
  <div class="monitordetail">
    <top-control :history="historyArr" :btnArr="btnArr"></top-control>
    <div class="nodiv"></div>
    <!-- 设备信息 -->
    <DeviceDetailInfo :list="deviceinfo" />
    <!-- 设备监控 -->
    <DeviceMonitor class="fl" />
    <!-- 设备温度分析 -->
    <DeviceAnalyze ref="terChartsDetails" class="fl" />
    <!-- 设备提示 -->
    <PormptInfo class="fl" />
    <!-- 设备作业记录 -->
    <DeviceWork class="fl" />
  </div>
</template>

<script>
import io from "socket.io-client";
import { DeviceInfoDetail_New } from "@/until/class.js";
import { terDetails } from "@/api/AgrApi/devicedetail";
import TopControl from "@/views/AgrPages/Component/TopControl";
import DeviceDetailInfo from "./components/DeviceDetailInfo";
import DeviceMonitor from "./components/DeviceMonitor";
import DeviceAnalyze from "./components/DeviceAnalyze";
import PormptInfo from "./components/PormptInfo";
import DeviceWork from "./components/DeviceWork";
export default {
  name: "monitordetail",

  components: {
    TopControl,
    DeviceDetailInfo,
    DeviceMonitor,
    DeviceAnalyze,
    PormptInfo,
    DeviceWork
  },
  data() {
    return {
      startTime: '',
      deviceinfo: {},
      terChartsDetails: [],
      historyArr: [
        {
          name: "首页",
          path: "/game/agrindex"
        },
        {
          name: "烘干监测",
          path: "/game/dryingwork"
        },
        {
          name: "设备监测",
          path: "/game/dryingmonitor"
        }
      ],
      btnArr: [
        {
          name: "烘干作业",
          path: "/game/dryingwork"
        },
        {
          name: "设备监测",
          path: "/game/dryingmonitor"
        }
      ]
    };
  },
  computed: {},
  created() {
    this.getQuery();
    this.terDetails();
    this.initWebSocket();
    setInterval(() => {
    // console.log("TCL: created -> setInterval")
      this.$refs.terChartsDetails.freshEcharts(4, 480)
    }, 3100);
  },
  methods: {
    /**query参数 */
    getQuery() {
      this.agrId = this.$getQuery().agrId;
    },
    /**详情 */
    async terDetails() {
      let res = await terDetails({
        agrId: this.agrId
      });
      if  (res.code == 500) {

        return this.$Message.info('暂无数据!')
      }
      // console.log("TCL: terDetails -> res", res)
      this.deviceinfo = new DeviceInfoDetail_New(res.terTopDetails).workinfo;
      /**设备温度分析 */
      this.terChartsDetails = res.terChartsDetails;
      this.startTime = res.terChartsDetails[0].sendtime
      this.$refs.terChartsDetails.initEchart(this.terChartsDetails);
      // socket
      // this.initSocketIo();
    },
    // initSocketIo() {
    //   let userId =  this.$store.state.user.token;
    // //   console.log("TCL: initSocketIo -> userId", userId)
    //   if (!userId) return;
    //   // let socketurl = baseURL.replace(":8858/app/v1", ":8859?userId=");
    //   let socketurl =
    //     "ws://192.168.2.77:8888/app/v1/socketServer/" + userId;
    //   this.socket = io(socketurl, {
    //     transports: ["websocket", "xhr-polling", "jsonp-polling"]
    //   });
    //   this.socket.on("SOCKET-SUCCESS", v => {
    //     console.log(v);
    //     alert("连接成功！！！");
    //   });
    //   this.socket.on("SOCKET-FAILURE", v => {
    //     console.log(v);
    //     alert("非法连接！！！");
    //   });
    //   this.socket.on("SOCKET-REPETITION", v => {
    //     console.log(v);
    //     alert("重复连接！！！");
    //   });
    //   this.socket.on("LOGIN-EDGEOUT", v => {
    //     // 建了链接后默认  小智给你打招呼
    //     this.$toast("您已在其他设备登录!");
    //     this.$logOut();
    //     this.$router.replace("/Login");
    //   });
    //   this.socket.on("LOGIN-CHANGEPASSWORD", data => {
    //     this.$toast("密码已修改, 请重新登录!");
    //     this.$logOut();
    //     this.$router.replace("/Login");
    //   });
    // },

    initWebSocket() {
      let userId = this.$store.state.user.token;
      if (!userId) return;
      // let socketurl = baseURL.replace(":8858/app/v1", ":8859?userId=");
      let socketurl = "ws://192.168.2.77:8888/app/v1/socketServer/" + userId;
      //初始化weosocket
      //const wsuri = process.env.WS_API + "/websocket/threadsocket";//ws地址
      // const wsuri = "ws://192.168.1.4:8888/app/v1/websocket/" + userId; //ws地址
      this.websocket = new WebSocket(socketurl);
      console.log(this.websocket, "ceshi");

      this.websocket.onopen = this.websocketonopen;

      this.websocket.onerror = this.websocketonerror;

      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },

    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },

    websocketonmessage(e) {
      console.log(e);
      try {
        e = JSON.parse(e.data);
      } catch (err) {}
      let xdata = (new Date(e.data.sendtime) - new Date(this.startTime))/1000;
      let ydata = e.data.energyelec;
      this.$refs.terChartsDetails.freshEcharts(xdata, ydata)

    },
            
    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },

    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e.code + ")");
    }
  }
};
</script>

<style scoped lang='scss'>
.nodiv {
  height: 65px;
}
.monitordetail {
  min-width: 1800px;
  // position: fixed;
  // top: 130px;
  // bottom: 0;
  // left: 54px;
  // right: 0;
  // overflow-y: scroll;
}
</style>
