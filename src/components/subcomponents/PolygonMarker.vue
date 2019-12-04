<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/polygon.png" style="width: 32px">
            <br>多边形</a>

        <Drawer
                title="多边形"
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
                <Button type="text" @click="addPins">add polygon</Button>
                <!--<Button type="text" @click="setFont">setFont</Button>-->
                <!--<Button type="text" @click="submit3">gx KML extensions - Bike Ride</Button>-->
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
            addPins() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;



                var redPolygon = viewer.entities.add({
                    name : 'Red polygon on surface',
                    polygon : {
                        hierarchy : Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0,
                            -115.0, 32.0,
                            -107.0, 33.0,
                            -102.0, 31.0,
                            -102.0, 35.0]),
                        material : Cesium.Color.RED
                    }
                });

                var greenPolygon = viewer.entities.add({
                    name : 'Green extruded polygon',
                    polygon : {
                        hierarchy : Cesium.Cartesian3.fromDegreesArray([-108.0, 42.0,
                            -100.0, 42.0,
                            -104.0, 40.0]),
                        extrudedHeight: 500000.0,
                        material : Cesium.Color.GREEN,
                        closeTop : false,
                        closeBottom : false
                    }
                });

                var orangePolygon = viewer.entities.add({
                    name : 'Orange polygon with per-position heights and outline',
                    polygon : {
                        hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([-108.0, 25.0, 100000,
                            -100.0, 25.0, 100000,
                            -100.0, 30.0, 100000,
                            -108.0, 30.0, 300000]),
                        extrudedHeight: 0,
                        perPositionHeight : true,
                        material : Cesium.Color.ORANGE.withAlpha(0.5),
                        outline : true,
                        outlineColor : Cesium.Color.BLACK
                    }
                });

                var bluePolygon = viewer.entities.add({
                    name : 'Blue polygon with holes',
                    polygon : {
                        hierarchy : {
                            positions : Cesium.Cartesian3.fromDegreesArray([-99.0, 30.0,
                                -85.0, 30.0,
                                -85.0, 40.0,
                                -99.0, 40.0]),
                            holes : [{
                                positions : Cesium.Cartesian3.fromDegreesArray([
                                    -97.0, 31.0,
                                    -97.0, 39.0,
                                    -87.0, 39.0,
                                    -87.0, 31.0
                                ]),
                                holes : [{
                                    positions : Cesium.Cartesian3.fromDegreesArray([
                                        -95.0, 33.0,
                                        -89.0, 33.0,
                                        -89.0, 37.0,
                                        -95.0, 37.0
                                    ]),
                                    holes : [{
                                        positions : Cesium.Cartesian3.fromDegreesArray([
                                            -93.0, 34.0,
                                            -91.0, 34.0,
                                            -91.0, 36.0,
                                            -93.0, 36.0
                                        ])
                                    }]
                                }]
                            }]
                        },
                        material : Cesium.Color.BLUE.withAlpha(0.5),
                        height : 0,
                        outline : true // height is required for outline to display
                    }
                });

                var cyanPolygon = viewer.entities.add({
                    name : 'Cyan vertical polygon with per-position heights and outline',
                    polygon : {
                        hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([
                            -90.0, 41.0, 0.0,
                            -85.0, 41.0, 500000.0,
                            -80.0, 41.0, 0.0
                        ]),
                        perPositionHeight : true,
                        material : Cesium.Color.CYAN.withAlpha(0.5),
                        outline : true,
                        outlineColor : Cesium.Color.BLACK
                    }
                });

                var purplePolygonUsingRhumbLines = viewer.entities.add({
                    name : 'Purple polygon using rhumb lines with outline',
                    polygon : {
                        hierarchy : Cesium.Cartesian3.fromDegreesArray([-120.0, 45.0,
                            -80.0, 45.0,
                            -80.0, 55.0,
                            -120.0, 55.0]),
                        extrudedHeight: 50000,
                        material : Cesium.Color.PURPLE,
                        outline : true,
                        outlineColor : Cesium.Color.MAGENTA,
                        arcType : Cesium.ArcType.RHUMB
                    }
                });

                viewer.zoomTo(viewer.entities);//Sandcastle_End


            },
            setFont() {
                //Example 2: Load with basic styling options.
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                    label: {
                        text: 'Philadelphia',
                        font: '24px Helvetica',
                        fillColor: Cesium.Color.SKYBLUE,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 2,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE
                    }
                });
            },
            submit3() {
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
