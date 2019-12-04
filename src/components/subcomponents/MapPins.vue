<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/pin-small.png" style="width: 32px">
            <br>地图钉</a>

        <Drawer
                title="地图钉"
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
                <Button type="text" @click="addPins">addPins</Button>
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


                var pinBuilder = new Cesium.PinBuilder();

                var bluePin = viewer.entities.add({
                    name: 'Blank blue pin',
                    position: Cesium.Cartesian3.fromDegrees(-75.170726, 39.9208667),
                    billboard: {
                        image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    }
                });

                var questionPin = viewer.entities.add({
                    name: 'Question mark',
                    position: Cesium.Cartesian3.fromDegrees(-75.1698529, 39.9220071),
                    billboard: {
                        image: pinBuilder.fromText('?', Cesium.Color.BLACK, 48).toDataURL(),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    }
                });

                var url = Cesium.buildModuleUrl('Assets/Textures/maki/grocery.png');
                var groceryPin = Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48), function (canvas) {
                    return viewer.entities.add({
                        name: 'Grocery store',
                        position: Cesium.Cartesian3.fromDegrees(-75.1705217, 39.921786),
                        billboard: {
                            image: canvas.toDataURL(),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                });

//Create a red pin representing a hospital from the maki icon set.
                var hospitalPin = Cesium.when(pinBuilder.fromMakiIconId('hospital', Cesium.Color.RED, 48), function (canvas) {
                    return viewer.entities.add({
                        name: 'Hospital',
                        position: Cesium.Cartesian3.fromDegrees(-75.1698606, 39.9211275),
                        billboard: {
                            image: canvas.toDataURL(),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                });

//Since some of the pins are created asynchronously, wait for them all to load before zooming/
                Cesium.when.all([bluePin, questionPin, groceryPin, hospitalPin], function (pins) {
                    viewer.zoomTo(pins);
                });


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
