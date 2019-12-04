<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/pen.png" style="width: 32px">
            <br>绘制</a>

        <Drawer
                title="绘制"
                v-model="value3"
                width="200"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="选择模型位置" label-position="top">
                        <br>
                        <Input class="input" v-model="location"
                               placeholder="120 31 15000" style="width: 300px"/>


                    </FormItem>
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="init2">开始</Button>
                <Button type="text" @click="drawingLine">切换绘制线</Button>
                <Button type="text" @click="drawingPolygon">切换绘制多边形</Button>

            </div>
        </Drawer>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {mapActions, mapState} from 'vuex'


    export default {
        data() {
            return {
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                location: '',
                drawingMode: 'line',
                activeShapePoints: [],
                // entity存放
                activeShape: undefined,
                // entity
                floatingPoint: undefined

            };
        },
        computed: {
            ...mapState(['myMap']),
        },
        created() {


        },
        methods: {
            async getlunbotu() {

            },
            async drawingLine() {
                this.$Message.info('加载');

                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                if (!Cesium.Entity.supportsPolylinesOnTerrain(viewer.scene)) {
                    window.alert('This browser does not support polylines on terrain.');
                }

                this.terminateShape();
                this.drawingMode = 'line';

            },
            async drawingPolygon() {
                this.$Message.info('加载');

                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                if (!Cesium.Entity.supportsPolylinesOnTerrain(viewer.scene)) {
                    window.alert('This browser does not support polylines on terrain.');
                }

                this.terminateShape();
                this.drawingMode = 'polygon';

            },
            createPoint(worldPosition) {
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var point = viewer.entities.add({
                    position: worldPosition,
                    point: {
                        color: Cesium.Color.WHITE,
                        pixelSize: 5,
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                    }
                });
                return point;
            },
            drawShape(positionData) {
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var shape;
                if (this.drawingMode === 'line') {
                    shape = viewer.entities.add({
                        polyline: {
                            positions: positionData,
                            clampToGround: true,
                            width: 3
                        }
                    });
                }
                else if (this.drawingMode === 'polygon') {
                    shape = viewer.entities.add({
                        polygon: {
                            hierarchy: positionData,
                            material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0.7))
                        }
                    });
                }
                return shape;
            },
            // Redraw the shape so it's not dynamic and remove the dynamic shape.
            terminateShape() {
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                this.activeShapePoints.pop();
                this.drawShape(this.activeShapePoints);
                viewer.entities.remove(this.floatingPoint);
                viewer.entities.remove(this.activeShape);
                this.floatingPoint = undefined;
                this.activeShape = undefined;
                this.activeShapePoints = [];
            },

            init2() {
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                if (!viewer.scene.pickPositionSupported) {
                    window.alert('This browser does not support pickPosition.');
                }
// 移除
                viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

                //
                var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

                var that = this;

                // TODO 点击位置有偏移
                // 鼠标左点击事件
                handler.setInputAction(function (event) {
                    // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
                    // we get the correct point when mousing over terrain.
                    var earthPosition = viewer.scene.pickPosition(event.position);
                    // `earthPosition` will be undefined if our mouse is not over the globe.
                    if (Cesium.defined(earthPosition)) {
                        if (that.activeShapePoints.length === 0) {
                            that.floatingPoint = that.createPoint(earthPosition);
                            that.activeShapePoints.push(earthPosition);
                            var dynamicPositions = new Cesium.CallbackProperty(function () {
                                if (that.drawingMode === 'polygon') {
                                    return new Cesium.PolygonHierarchy(that.activeShapePoints);
                                }
                                return that.activeShapePoints;
                            }, false);
                            that.activeShape = that.drawShape(dynamicPositions);
                        }
                        that.activeShapePoints.push(earthPosition);
                        that.createPoint(earthPosition);
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                // 鼠标移动事件
                handler.setInputAction(function (event) {
                    if (Cesium.defined(that.floatingPoint)) {
                        var newPosition = viewer.scene.pickPosition(event.endPosition);
                        if (Cesium.defined(newPosition)) {
                            that.floatingPoint.position.setValue(newPosition);
                            that.activeShapePoints.pop();
                            that.activeShapePoints.push(newPosition);
                        }
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                // 右键结束绘制
                handler.setInputAction(function (event) {
                    that.terminateShape();
                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            }
        },
        components: {
            // 注册子组件

        }
    }
    ;
</script>

<style lang="scss" scoped>

    .container {
        display: flex;
        flex-direction: column;

        /*label {*/
        /*display: inline;*/
        /*}*/
        /*input {*/
        /*display: inline;*/
        /*}*/
    }

</style>
