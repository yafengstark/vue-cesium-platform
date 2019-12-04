<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/mouse.png" style="width: 32px">
            <br>Pick</a>

        <Drawer
                title="Pick"
                v-model="value3"
                width="200"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">
                    <!--<FormItem label="选择模型位置" label-position="top">-->
                    <!--<br>-->
                    <!--<Input class="input" v-model="location"-->
                    <!--placeholder="120 31 15000" style="width: 300px"/>-->


                    <!--</FormItem>-->
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消</Button>
                <Button type="text" @click="showPosition">Show Cartographic Position on Mouse Over</Button>
                <Button type="text" @click="pickEntity">pickEntity</Button>
                <Button type="text" @click="drillDownPicking">Drill-Down Picking</Button>
                <Button type="text" @click="pickPosition">pickPosition</Button>
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
                handler: undefined

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
            showPosition() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var scene = viewer.scene;
                if (!scene.pickPositionSupported) {
                    window.alert('This browser does not support pickPosition.');
                }
                var handler = this.handler;

                var entity = viewer.entities.add({
                    label: {
                        show: false,
                        showBackground: true,
                        font: '14px monospace',
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        verticalOrigin: Cesium.VerticalOrigin.TOP,
                        pixelOffset: new Cesium.Cartesian2(15, 0)
                    }
                });

                // Mouse over the globe to see the cartographic position
                handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                handler.setInputAction(function (movement) {
                    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
                    if (cartesian) {
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

                        entity.position = cartesian;
                        entity.label.show = true;
                        entity.label.text =
                            'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                            '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
                    } else {
                        entity.label.show = false;
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


            },
            pickEntity() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var scene = viewer.scene;
                if (!scene.pickPositionSupported) {
                    window.alert('This browser does not support pickPosition.');
                }

                var handler = this.handler;

                var entity = viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
                    billboard: {
                        image: '../../../lib/images/Cesium_Logo_overlay.png'
                    }
                });

                // If the mouse is over the billboard, change its scale and color
                handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                handler.setInputAction(function (movement) {
                    var pickedObject = scene.pick(movement.endPosition);
                    if (Cesium.defined(pickedObject) && (pickedObject.id === entity)) {
                        entity.billboard.scale = 2.0;
                        entity.billboard.color = Cesium.Color.YELLOW;
                    } else {
                        entity.billboard.scale = 1.0;
                        entity.billboard.color = Cesium.Color.WHITE;
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            },
            drillDownPicking() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var scene = viewer.scene;
                if (!scene.pickPositionSupported) {
                    window.alert('This browser does not support pickPosition.');
                }

                var handler = this.handler;

                var pickedEntities = new Cesium.EntityCollection();
                var pickColor = Cesium.Color.YELLOW.withAlpha(0.5);

                function makeProperty(entity, color) {
                    var colorProperty = new Cesium.CallbackProperty(function (time, result) {
                        if (pickedEntities.contains(entity)) {
                            return pickColor.clone(result);
                        }
                        return color.clone(result);
                    }, false);

                    entity.polygon.material = new Cesium.ColorMaterialProperty(colorProperty);
                }

                var red = viewer.entities.add({
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray([-70.0, 30.0,
                            -60.0, 30.0,
                            -60.0, 40.0,
                            -70.0, 40.0]),
                        height: 0
                    }
                });
                makeProperty(red, Cesium.Color.RED.withAlpha(0.5));

                var blue = viewer.entities.add({
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray([-75.0, 34.0,
                            -63.0, 34.0,
                            -63.0, 40.0,
                            -75.0, 40.0]),
                        height: 0
                    }
                });
                makeProperty(blue, Cesium.Color.BLUE.withAlpha(0.5));

                var green = viewer.entities.add({
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray([-67.0, 36.0,
                            -55.0, 36.0,
                            -55.0, 30.0,
                            -67.0, 30.0]),
                        height: 0
                    }
                });
                makeProperty(green, Cesium.Color.GREEN.withAlpha(0.5));

                // Move the primitive that the mouse is over to the top.
                handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                handler.setInputAction(function (movement) {
                    // get an array of all primitives at the mouse position
                    var pickedObjects = scene.drillPick(movement.endPosition);
                    if (Cesium.defined(pickedObjects)) {
                        //Update the collection of picked entities.
                        pickedEntities.removeAll();
                        for (var i = 0; i < pickedObjects.length; ++i) {
                            var entity = pickedObjects[i].id;
                            pickedEntities.add(entity);
                        }
                    }

                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            },
            pickPosition() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var scene = viewer.scene;
                if (!scene.pickPositionSupported) {
                    window.alert('This browser does not support pickPosition.');
                }

                var handler = this.handler;

                var modelEntity = viewer.entities.add({
                    name: 'milktruck',
                    position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
                    model: {
                        uri: '../../../lib/SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.glb'
                    }
                });
                viewer.zoomTo(modelEntity);

                var labelEntity = viewer.entities.add({
                    label: {
                        show: false,
                        showBackground: true,
                        font: '14px monospace',
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        verticalOrigin: Cesium.VerticalOrigin.TOP,
                        pixelOffset: new Cesium.Cartesian2(15, 0)
                    }
                });

                // Mouse over the globe to see the cartographic position
                handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                handler.setInputAction(function (movement) {

                    var foundPosition = false;

                    var scene = viewer.scene;
                    if (scene.mode !== Cesium.SceneMode.MORPHING) {
                        var pickedObject = scene.pick(movement.endPosition);
                        if (scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.id === modelEntity) {
                            var cartesian = viewer.scene.pickPosition(movement.endPosition);

                            if (Cesium.defined(cartesian)) {
                                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                                var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                                var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
                                var heightString = cartographic.height.toFixed(2);

                                labelEntity.position = cartesian;
                                labelEntity.label.show = true;
                                labelEntity.label.text =
                                    'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                                    '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
                                    '\nAlt: ' + ('   ' + heightString).slice(-7) + 'm';

                                labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -cartographic.height * (scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0));

                                foundPosition = true;
                            }
                        }
                    }

                    if (!foundPosition) {
                        labelEntity.label.show = false;
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
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
