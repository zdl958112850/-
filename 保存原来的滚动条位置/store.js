import Vue from 'vue'
import Vuex from 'vuex'
import BMap from "BMap";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 定位经纬度
        point: [],
        form: {},
        LOADING: false,
        userId: '',
        list_top: '',
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        SET_POINT(state, point) {
            state.point = point
        },
        saveData(state, form) {
            state.form = form;
        },
        getData(state) {
            console.log(state.form, '333333');
            return state.form
        },
        showLoading(state) {
            state.LOADING = true
        },
        hideLoading(state) {
            state.LOADING = false
        },
        /**设置滚动条位置 */
        setListTop (state, v) {
            state.list_top = v;
        },

    },
    actions: {
        /**
         * 获得定位信息-高德地图
         * @param commit
         * @returns {Promise<any>}
         * @constructor
         */
        GetCurrentCoordinates({commit}) {
            let params = arguments[1] ? arguments[1] : false;
            return new Promise((resolve, reject) => {
                if (params) {
                    commit("SET_POINT", params);
                    // TODO: 可以对localStorage进一步封装
                    sessionStorage.setItem("_point_", JSON.stringify(params));
                    resolve(params);
                } else {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition, showerror);
                        function showPosition(position) {
                            try {
                                var result = gcoord.transform(
                                    [position.coords.longitude, position.coords.latitude], // 经纬度坐标
                                    gcoord.WGS84, // 当前坐标系
                                    gcoord.BD09 // 目标坐标系
                                );
                                localStorage.setItem("lng", result[0]);
                                localStorage.setItem("lat", result[1]);
                                let point = {lng: result[0], lat: result[1]};
                                sessionStorage.setItem("_point_", JSON.stringify(point));
                                resolve(point);
                            } catch (e) {
                                BDGetCurrentCoordinates().then(re => {
                                    resolve(re);
                                });
                            }
                        }
                        function showerror(error) {
                            BDGetCurrentCoordinates().then(re => {
                                resolve(re);
                            });
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    console.log("用户拒绝共享地理位置信息");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    console.log("无法获取当前位置");
                                    break;
                                case error.TIMEOUT:
                                    console.log("操作超时");
                                    break;
                                case error.UNKNOWN_ERROR:
                                    console.log("其他错误");
                                    break;
                            }
                        }
                    } else {
                        reject("该浏览器不支持");
                        BDGetCurrentCoordinates().then(re => {
                            resolve(re);
                        });
                    }
                }
            });
        }
    }
})

/**
 * 获得当前坐标-百度地图定位
 * @returns {Promise<any>}
 * @constructor
 */
function BDGetCurrentCoordinates() {
    return new Promise((resolve, reject) => {
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
            function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    sessionStorage.setItem("_point_", JSON.stringify(r.point));
                    resolve(r.point);
                } else {
                    reject(this.getStatus());
                }
            },
            {enableHighAccuracy: true}
        );
    });
}
