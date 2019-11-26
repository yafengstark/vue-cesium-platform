/*
状态对象
 */
export default {
    messageView: undefined,// this.$Message的同一对象
    myMap: undefined, // leaflet map = myMap.mapObject
    myMapHandleObject: {
        rectangle: { // 框选的框
            minLon: -180,
            maxLon: 180,
            minLat: -90,
            maxLat: 90,
        },
        layers: {
            osm: null,
            mapbox: null
        }

    },
    isPass: false, // token是否通过验证
    user: {
        username: "",
        userNo: '',
        token: ''
    },
    editMark: {
        markId: 0,
        name: '',
        lon: 0,
        lat: 0,
        username: '',
        description: '',
        createTime: '',
        updateTime: '',
        clazzCode: '',
    },
    markList: [], // 首页目标列表
    pageIndex: 1, // 首页分页下标
    markAmount: 0, // 共有多少标注
    markSubName: '', // 标注部分名称
}