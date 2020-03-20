<template>
    <div>

        <!--在线标注-->
        <Button @click="hideIt">隐藏</Button>
        在线标注

        <br/>
        选择
        <Select v-model="drawMode" style="width:200px">
            <Option v-for="item in drawModeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        左键选点，右键结束
        <br/>


        绘制：<i-switch v-model="switch1" @on-change="change" />

        <!-- 传到服务器段保存 -->
        <Button @click="saveDraw">保存绘制结果</Button>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'


    import ISwitch from "../../../node_modules/iview/src/components/switch/switch.vue";


    export default {
        data() {
            return {
                switch1: false,
                // 当前绘制的类型
                drawMode: 'point',
                // 当前是否在绘制中
                isDrawing: false,
                /** 绘制中 **/

                // 鼠标移动时对应的position
                mousePosition: undefined,
                mouseEntity: undefined,


                // -------  -------
                // 不包含鼠标的采集点
                floatingPositions: [],
                // 不包含鼠标的采集点 对应的 entity
                floatingEntities: [],

                // 包含鼠标的采集点
                activePositions: [],
                // 包含鼠标点绘制的图形
                activeEntity: undefined,
                /** 结束时的结果 **/

                // 结束绘制时的点集
                endPositions: [],
                // 结束绘制时的多边形 entity
                endEntity: undefined,


                // cesium事件句柄
                handler: undefined,

                drawModeList: [
                    {
                        value: 'point',
                        label: '点'
                    },
                    {
                        value: 'line',
                        label: '线'
                    },
                    {
                        value: 'polygon',
                        label: '面'
                    },
                    {
                        value: 'circle',
                        label: '圆'
                    },
                    {
                        value: 'rectangle',
                        label: '矩形'
                    },
                ],

                resultList: [
                    {
                        pkId: 1,
                        type: ''
                    }
                ]

            };
        },
        computed: {
            ...mapState(['isGraphicsWorkspaceShow']),
        },
        created() {
            // 选择显示

        },
        methods: {


            changeShow(layer) {
                console.log(layer);
            },
            hideIt() {
                console.log('点击了隐藏');
                this.$store.commit('setGraphicsWorkspaceViz', {show: false});
            },

            change (status) {
                this.$Message.info('开关状态：' + status);

                if(status){
                    this.startDraw();
                }else{
                    this.stopDraw();
                }

            },
            /**
             * 不允许多点
             *
             *
             * @param positionData
             * @returns {Entity}
             */
            drawShape(positionData) {
                var Cesium = this.$store.state.Cesium;
                var viewer = this.$store.state.viewer;
                var that = this;

                var shape;
                if( that.drawMode === 'point'){
                    shape = viewer.entities.add({
                        position: positionData[0],
                        point: {
                            color: Cesium.Color.BLUE,
                            pixelSize: 10,
                        }
                    });
                }
                else if (that.drawMode === 'line') {
                    shape = viewer.entities.add({
                        polyline: {
                            positions: positionData,
                            clampToGround: true,
                            width: 3
                        }
                    });
                } else if (that.drawMode === 'polygon') {
                    shape = viewer.entities.add({
                        polygon: {
                            hierarchy: positionData,
                            material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0.7))
                        }
                    });
                    //
                }
                else if (that.drawMode === 'circle') {
                    //当positionData为数组时绘制最终图，如果为function则绘制动态图

                    console.log("positionData.getValue: " + positionData.getValue)

                    var value = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
                    console.log(value);
//                    var start = that.activePositions[0];
//                    var end = that.activePositions[that.activePositions.length - 1];
//                    var r = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
//                    r = r ? r : r + 1;

                    shape = viewer.entities.add({
                        position: that.activePositions[0],
                        name: 'Blue translucent, rotated, and extruded ellipse with outline',
                        type: 'Selection tool',
                        ellipse: {
                            semiMinorAxis: new Cesium.CallbackProperty(function () {
                                //半径 两点间距离
                                var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                                return r ? r : r + 1;
                            }, false),
                            semiMajorAxis: new Cesium.CallbackProperty(function () {
                                var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                                return r ? r : r + 1;
                            }, false),
                            material: Cesium.Color.BLUE.withAlpha(0.5),
                            outline: true
                        }
                    });
                } else if (that.drawMode === 'rectangle') {
                    //当positionData为数组时绘制最终图，如果为function则绘制动态图
                    var arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
                    shape = viewer.entities.add({
                        name: 'Blue translucent, rotated, and extruded ellipse with outline',
                        rectangle: {
                            coordinates: new Cesium.CallbackProperty(function () {
                                var obj = Cesium.Rectangle.fromCartesianArray(arr);
                                //if(obj.west==obj.east){ obj.east+=0.000001};
                                //if(obj.south==obj.north){obj.north+=0.000001};
                                return obj;
                            }, false),
                            material: Cesium.Color.RED.withAlpha(0.5)
                        }
                    });
                }
                return shape;
            },


            startDraw() {

                var Cesium = this.$store.state.Cesium;
                var viewer = this.$store.state.viewer;
                var that = this;

                // 正在绘制中的标注位
                this.isDrawing = true;

                // 还原数据
                this.clearDraw();


                // 获取事件句柄

                this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

//          添加绘制事件

                //双击鼠标左键清除默认事件
                viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

                // Redraw the shape so it's not dynamic and remove the dynamic shape.
                // 暂停绘制


                //绘制点
                /**
                 * 创建顶点并绘制在地图上
                 *
                 * retirm entity
                 * */
                function createPoint(worldPosition) {
                    var point = viewer.entities.add({
                        position: worldPosition,
                        point: {
                            color: Cesium.Color.RED,
                            pixelSize: 5,
//                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                        }
                    });
                    return point;
                }

                //绘制图形


                // 注册鼠标左键事件
                that.handler.setInputAction(function (event) {
                    // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
                    // we get the correct point when mousing over terrain.
                    console.log('event position ');
                    // event.position应该是文件位置
                    // 笛卡尔二维坐标C2
                    console.log(event.position)

                    var ray = viewer.camera.getPickRay(event.position);
                    var position = viewer.scene.globe.pick(ray, viewer.scene);
                    console.log('三维笛卡尔坐标')
                    // 笛卡尔三维坐标C3
                    console.log(position)

                    // （笛卡尔坐标）转经纬度坐标
                    var ellipsoid = viewer.scene.globe.ellipsoid;
                    var cartographic = ellipsoid.cartesianToCartographic(position);

                    var lat = Cesium.Math.toDegrees(cartographic.latitude);
                    var lng = Cesium.Math.toDegrees(cartographic.longitude);
                    console.log('lat: ' + lat)
                    console.log('lon:' + lng);
                    console.log('height' + cartographic.height);
                    var position2 = Cesium.Cartesian3.fromDegrees(lng, lat, 0, ellipsoid);//其中，高度默认值为0，可以不用填写；longitude和latitude为角度
                    console.log('通过函数反算的三维笛卡尔坐标')
                    console.log(position2)

                    // 原代码
//            var earthPosition = viewer.scene.pickPosition(event.position);
                    var earthPosition = position;

                    console.log(earthPosition);

                    // `earthPosition` will be undefined if our mouse is not over the globe.
                    if (Cesium.defined(earthPosition)) {
                        if (that.floatingPositions.length === 0) {
                            // 第一次点击

                            //
                            var dynamicPositions = new Cesium.CallbackProperty(function () {
                                // 动态响应图形，
                                if (that.drawMode === 'polygon') {
                                    return new Cesium.PolygonHierarchy(that.activePositions);
                                }else if (that.drawMode === 'circle') {
                                }
                                return that.activePositions;
                            }, false);

                            // 绘制中间过程的动态图形
                            // 传入的是function
                            that.activeEntity = that.drawShape(dynamicPositions);


                        } else {


                        }

                        //
                        that.floatingPositions.push(earthPosition);
                        that.floatingEntities.push(createPoint(earthPosition));

                        //包含鼠标的采集点
                        if (that.activePositions.length > 0) {
                            //T
                        }
                        that.activePositions.push(earthPosition);


                        // 只允许绘制一个点
                        if(that.drawMode === 'point'
                            && that.floatingPositions.length === 1){
                            that.terminateDraw();
                        }else if(that.drawMode === 'circle'
                        && that.floatingPositions.length === 2){
                            that.terminateDraw();
                        }else if(that.drawMode === 'rectangle'
                            && that.floatingPositions.length === 2){
                            that.terminateDraw();
                        }



                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                // 鼠标移动事件
                that.handler.setInputAction(function (event) {
                    if (Cesium.defined(that.floatingPointShape)) {
                        // 不是第一次点击了
                        var newPosition = viewer.scene.pickPosition(event.endPosition);
                        if (Cesium.defined(newPosition)) {
                            // 变换最新位置
//                            that.floatingPointShape.position.setValue(newPosition);
                            that.activePositions.pop();
                            that.activePositions.push(newPosition);
                        }
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                // 右键暂停绘制
                that.handler.setInputAction(function (event) {
                    that.terminateDraw();
                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


            },
            // 结束绘制
            terminateDraw() {

                console.log('右键结束绘制');
                var Cesium = this.$store.state.Cesium;
                var viewer = this.$store.state.viewer;
                var that = this;

                this.isDrawing = false;


                // 结束绘制时的点集
                that.endPositions = [];

                this.floatingPositions.forEach(item => {
                    that.endPositions.push(item);
                });


                if (that.endPositions.length > 0) {
                    //绘制最终图
                    that.endEntity = that.drawShape(that.endPositions);

                    console.log('-右键结束绘制时的点集--')
                    console.log(that.endPositions.length)
                }


                // -------清空其他数据-----

                // 鼠标移动时对应的position
                if (that.mousePosition !== undefined) {
                    that.mousePosition = undefined;
                }
                if (that.mouseEntity !== undefined) {
                    viewer.entities.remove(this.mouseEntity);
                    that.mouseEntity = undefined;
                }
                if (that.floatingPositions.length > 0) {
                    that.floatingPositions = [];
                }
                if (that.floatingEntities.length > 0) {
                    that.floatingEntities.forEach(item => {
                        viewer.entities.remove(item);
                    })

                }
                if (that.activePositions.length > 0) {
                    that.activePositions = [];
                }
                if (that.activeEntity !== undefined) {
                    viewer.entities.remove(this.activeEntity);
                    that.activeEntity = undefined;
                }



                //
                var handler = this.handler;
                if(handler !== undefined){
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
                }

            },
            stopDraw(){

                this.isDrawing = false;

                // 移除绘制，还原结果
                this.clearDraw();

                // 移除事件
                var handler = this.handler;
                if(handler !== undefined){
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
                }
            },
            // 还原数据,清空结果
            clearDraw() {
                var Cesium = this.$store.state.Cesium;
                var viewer = this.$store.state.viewer;
                //

                // 鼠标移动时对应的position
                if (this.mousePosition !== undefined) {
                    this.mousePosition = undefined;
                }
                if (this.mouseEntity !== undefined) {
                    viewer.entities.remove(this.mouseEntity);
                    this.mouseEntity = undefined;
                }
                if (this.floatingPositions.length > 0) {
                    this.floatingPositions = [];
                }
                if (this.floatingEntities.length > 0) {
                    this.floatingEntities.forEach(item => {
                        viewer.entities.remove(item);
                    })

                }
                if (this.activePositions.length > 0) {
                    this.activePositions = [];
                }
                if (this.activeEntity !== undefined) {
                    viewer.entities.remove(this.activeEntity);
                    this.activeEntity = undefined;
                }


                if (this.endPositions.length > 0) {
                    this.endPositions = [];
                }
                if (this.endEntity !== undefined) {
                    console.log('清空上次绘制结果')
                    viewer.entities.remove(this.endEntity);
                }

                console.log('this.floatingPositions.length')
                console.log(this.floatingPositions.length)


                console.log('this.endPositions.length')
                console.log(this.endPositions.length)

            },
            saveDraw() {

                if (this.isDrawing) {
                    this.$Message.error("请先结束当前绘制再保存")
//                    console.error('请先点击结束绘制')
                    return;
                }
                if(this.endPositions.length === 0){
                    this.$Message.error("无选择点，请绘制结束后点击保存")
//                    console.error('请先点击结束绘制')
                    return;
                }

                var Cesium = this.$store.state.Cesium;
                var viewer = this.$store.state.viewer;
                var that = this;

                console.log('绘制结果')
                console.log(this.endPositions.length);

                this.$Message.success("保存成功")


            },


        },
        components: {
            ISwitch
            // 注册子组件


        },

    };
</script>

<style lang="scss" scoped>
    .layer {
        background-color: #f6f6f6;
        border-width: 0.001px;
        border-color: #e2e2e2;
        /*border: solid;*/
    }

    .exist {

    }

    .not-exist {
        display: none;
    }


</style>
