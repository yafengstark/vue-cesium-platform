<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>键盘控制</a>

        <Drawer
                title="加载"
                v-model="value3"
                width="400"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">
                    <table class="infoPanel">
                        <tbody>
                        <tr>
                            <td>Click on the Cesium display to start.</td>
                        </tr>
                        <tr>
                            <td>w/s - move forward/backward</td>
                        </tr>
                        <tr>
                            <td>a/d - move left/right</td>
                        </tr>
                        <tr>
                            <td>q/e - move up/down</td>
                        </tr>
                        <tr>
                            <td>left mouse button down plus mouse move changes the look direction</td>
                        </tr>
                        </tbody>
                    </table>

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
                <Button type="primary" @click="submit">生效</Button>
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
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var scene = viewer.scene;
                var canvas = viewer.canvas;
                canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
                canvas.onclick = function() {
                    canvas.focus();
                };
                var ellipsoid = scene.globe.ellipsoid;

// disable the default event handlers
                scene.screenSpaceCameraController.enableRotate = false;
                scene.screenSpaceCameraController.enableTranslate = false;
                scene.screenSpaceCameraController.enableZoom = false;
                scene.screenSpaceCameraController.enableTilt = false;
                scene.screenSpaceCameraController.enableLook = false;

                var startMousePosition;
                var mousePosition;
                var flags = {
                    looking : false,
                    moveForward : false,
                    moveBackward : false,
                    moveUp : false,
                    moveDown : false,
                    moveLeft : false,
                    moveRight : false
                };

                var handler = new Cesium.ScreenSpaceEventHandler(canvas);

                handler.setInputAction(function(movement) {
                    flags.looking = true;
                    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
                }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

                handler.setInputAction(function(movement) {
                    mousePosition = movement.endPosition;
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                handler.setInputAction(function(position) {
                    flags.looking = false;
                }, Cesium.ScreenSpaceEventType.LEFT_UP);

                function getFlagForKeyCode(keyCode) {
                    switch (keyCode) {
                        case 'W'.charCodeAt(0):
                            return 'moveForward';
                        case 'S'.charCodeAt(0):
                            return 'moveBackward';
                        case 'Q'.charCodeAt(0):
                            return 'moveUp';
                        case 'E'.charCodeAt(0):
                            return 'moveDown';
                        case 'D'.charCodeAt(0):
                            return 'moveRight';
                        case 'A'.charCodeAt(0):
                            return 'moveLeft';
                        default:
                            return undefined;
                    }
                }

                document.addEventListener('keydown', function(e) {
                    var flagName = getFlagForKeyCode(e.keyCode);
                    if (typeof flagName !== 'undefined') {
                        flags[flagName] = true;
                    }
                }, false);

                document.addEventListener('keyup', function(e) {
                    var flagName = getFlagForKeyCode(e.keyCode);
                    if (typeof flagName !== 'undefined') {
                        flags[flagName] = false;
                    }
                }, false);

                viewer.clock.onTick.addEventListener(function(clock) {
                    var camera = viewer.camera;

                    if (flags.looking) {
                        var width = canvas.clientWidth;
                        var height = canvas.clientHeight;

                        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
                        var x = (mousePosition.x - startMousePosition.x) / width;
                        var y = -(mousePosition.y - startMousePosition.y) / height;

                        var lookFactor = 0.05;
                        camera.lookRight(x * lookFactor);
                        camera.lookUp(y * lookFactor);
                    }

                    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
                    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
                    var moveRate = cameraHeight / 100.0;

                    if (flags.moveForward) {
                        camera.moveForward(moveRate);
                    }
                    if (flags.moveBackward) {
                        camera.moveBackward(moveRate);
                    }
                    if (flags.moveUp) {
                        camera.moveUp(moveRate);
                    }
                    if (flags.moveDown) {
                        camera.moveDown(moveRate);
                    }
                    if (flags.moveLeft) {
                        camera.moveLeft(moveRate);
                    }
                    if (flags.moveRight) {
                        camera.moveRight(moveRate);
                    }
                });


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
