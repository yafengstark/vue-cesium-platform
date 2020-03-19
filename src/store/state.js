/*
状态对象
 */
export default {
    messageView: undefined,// this.$Message的同一对象
    // 核心类
    Cesium: undefined, //
    // viewer
    viewer: undefined,
    // 图层
    isLayerControlShow: true,
    // 地理书签
    isBookmarkWorkspaceShow: false,
    // 标注
    isGraphicsWorkspaceShow: false,
    //


    tabPaneShowState: {
        // isLayerControlShow: true
    },
    markList: [], // 首页目标列表

}