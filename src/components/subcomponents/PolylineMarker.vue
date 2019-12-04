<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/line.png" style="width: 32px">
            <br>线</a>

        <Drawer
                title="线"
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
                <Button style="margin-right: 8px" @click="cancel">取消</Button>
                <Button type="text" @click="addPolylineColor">Polyline Color</Button>
                <Button type="text" @click="polylineDash">Polyline Dash</Button>
                <Button type="text" @click="polyline">Polyline</Button>
                <!--<Button type="text" @click="submit4">加载geojson simplestyle</Button>-->
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
            addPolylineColor() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;



                var redLine = viewer.entities.add({
                    name : 'Red line on terrain',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArray([-75, 35,
                            -125, 35]),
                        width : 5,
                        material : Cesium.Color.RED,
                        clampToGround : true
                    }
                });

                var greenRhumbLine = viewer.entities.add({
                    name : 'Green rhumb line',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArray([-75, 35,
                            -125, 35]),
                        width : 5,
                        arcType : Cesium.ArcType.RHUMB,
                        material : Cesium.Color.GREEN
                    }
                });

                var glowingLine = viewer.entities.add({
                    name : 'Glowing blue line on the surface',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArray([-75, 37,
                            -125, 37]),
                        width : 10,
                        material : new Cesium.PolylineGlowMaterialProperty({
                            glowPower : 0.2,
                            taperPower : 0.5,
                            color : Cesium.Color.CORNFLOWERBLUE
                        })
                    }
                });

                var orangeOutlined = viewer.entities.add({
                    name : 'Orange line with black outline at height and following the surface',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 39, 250000,
                            -125, 39, 250000]),
                        width : 5,
                        material : new Cesium.PolylineOutlineMaterialProperty({
                            color : Cesium.Color.ORANGE,
                            outlineWidth : 2,
                            outlineColor : Cesium.Color.BLACK
                        })
                    }
                });

                var purpleArrow = viewer.entities.add({
                    name : 'Purple straight arrow at height',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 43, 500000,
                            -125, 43, 500000]),
                        width : 10,
                        arcType : Cesium.ArcType.NONE,
                        material : new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE)
                    }
                });

                var dashedLine = viewer.entities.add({
                    name : 'Blue dashed line',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 45, 500000,
                            -125, 45, 500000]),
                        width : 4,
                        material : new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.CYAN
                        })
                    }
                });

                viewer.zoomTo(viewer.entities);



            },
            polylineDash() {
                //Example 2: Load with basic styling options.
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var redLine = viewer.entities.add({
                    name : 'Red dashed line',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 38, 250000,
                            -125, 38, 250000]),
                        width : 5,
                        material : new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.RED
                        })
                    }
                });

                var blueLine = viewer.entities.add({
                    name : 'Wide blue dashed line with a gap color',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 40, 250000,
                            -125, 40, 250000]),
                        width : 30,
                        material : new Cesium.PolylineDashMaterialProperty({
                            color : Cesium.Color.BLUE,
                            gapColor: Cesium.Color.YELLOW
                        })
                    }
                });

                var orangeLine = viewer.entities.add({
                    name : 'Orange dashed line with a short dash length',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 42, 250000,
                            -125, 42, 250000]),
                        width : 5,
                        material : new Cesium.PolylineDashMaterialProperty({
                            color : Cesium.Color.ORANGE,
                            dashLength: 8.0
                        })
                    }
                });

                var cyanLine = viewer.entities.add({
                    name : 'Cyan dashed line with a dash pattern.',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 44, 250000,
                            -125, 44, 250000]),
                        width : 10,
                        material : new Cesium.PolylineDashMaterialProperty({
                            color : Cesium.Color.CYAN,
                            dashPattern: parseInt('110000001111', 2)
                        })
                    }
                });

                var yellowLine = viewer.entities.add({
                    name : 'Yellow dashed line with a dash pattern.',
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([-75, 46, 250000,
                            -125, 46, 250000]),
                        width : 10,
                        material : new Cesium.PolylineDashMaterialProperty({
                            color : Cesium.Color.YELLOW,
                            dashPattern: parseInt('1010101010101010', 2)
                        })
                    }
                });

                viewer.zoomTo(viewer.entities);
            },
            polyline() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var options = {
                    camera: viewer.scene.camera,
                    canvas: viewer.scene.canvas
                };

                viewer.dataSources.add(Cesium.KmlDataSource.load('../../../lib/SampleData/kml/bikeRide.kml', options)).then(function (dataSource) {
                    viewer.clock.shouldAnimate = false;
                    var rider = dataSource.entities.getById('tour');
                    viewer.flyTo(rider).then(function () {
                        viewer.trackedEntity = rider;
                        viewer.selectedEntity = viewer.trackedEntity;
                        viewer.clock.multiplier = 30;
                        viewer.clock.shouldAnimate = true;
                    });
                });
            },
            submit4() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var dataSource = Cesium.GeoJsonDataSource.load('../../../lib/SampleData/simplestyles.geojson');
                viewer.dataSources.add(dataSource);
                viewer.zoomTo(dataSource);
            },

            cancel() {
                this.value3 = false;
            }
        },
        components: {
            // 注册子组件

        }
    };
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
