/*
状态对象
 */
export default {
    messageView: undefined,// this.$Message的同一对象
    myMap: {
        Cesium: undefined, // 核心类
        viewer: undefined,
    },

    // tabs栏
    tabPaneShowState: {
        isLayerControlShow: true
    },
    markList: [], // 首页目标列表

}