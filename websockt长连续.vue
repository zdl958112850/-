<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      websock: null
    };
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      //const wsuri = process.env.WS_API + "/websocket/threadsocket";//ws地址
      const wsuri = "ws://47.104.192.11:8899/app/v1/websocket/test"; //ws地址
      this.websocket = new WebSocket(wsuri);
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
      //数据接收
      // const redata = JSON.parse(e); //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      // console.log(redata.value);
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