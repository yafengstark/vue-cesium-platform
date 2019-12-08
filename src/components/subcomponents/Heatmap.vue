<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/HEAT_MAP.png" style="width: 32px">
            <br>热力图</a>

        <Drawer
                title="矩形"
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
                <Button type="text" @click="addPins">add 矩形</Button>
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


                var redRectangle = viewer.entities.add({
                    name : 'Red translucent rectangle',
                    rectangle : {
                        coordinates : Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
                        material : Cesium.Color.RED.withAlpha(0.5)
                    }
                });

                var greenRectangle = viewer.entities.add({
                    name : 'Green translucent, rotated, and extruded rectangle at height with outline',
                    rectangle : {
                        coordinates : Cesium.Rectangle.fromDegrees(-110.0, 30.0, -100.0, 40.0),
                        material : Cesium.Color.GREEN.withAlpha(0.5),
                        rotation : Cesium.Math.toRadians(45),
                        extrudedHeight : 300000.0,
                        height : 100000.0,
                        outline : true, // height must be set for outline to display
                        outlineColor : Cesium.Color.BLACK
                    }
                });

                var rotation = Cesium.Math.toRadians(30);

                function getRotationValue() {
                    rotation += 0.005;
                    return rotation;
                }
                viewer.entities.add({
                    name: 'Rotating rectangle with rotating texture coordinate',
                    rectangle: {
                        coordinates: Cesium.Rectangle.fromDegrees(-92.0, 30.0, -76.0, 40.0),
                        material: '../../../lib/images/Cesium_Logo_Color.jpg',
                        rotation: new Cesium.CallbackProperty(getRotationValue, false),
                        stRotation: new Cesium.CallbackProperty(getRotationValue, false),
                        classificationType : Cesium.ClassificationType.TERRAIN
                    }
                });

                viewer.zoomTo(viewer.entities);


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
