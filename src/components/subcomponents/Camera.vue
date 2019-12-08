<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/camera.png" style="width: 32px">
            <br>相机控制</a>

        <Drawer
                title="相机控制"
                v-model="value3"
                width="400"
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
                <Button style="margin-right: 8px" @click="cancel">跳转场景参数</Button>
                <br>
                <Button  @click="submit">输出相机参数</Button>
                <br>
                <Button style="margin-right: 8px" @click="changePos">修改相机位置，设置一个对象位置或者范围</Button>
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
            changePos() {
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var camera = viewer.camera;

                var west = Cesium.Math.toRadians(-77.0);
                var south = Cesium.Math.toRadians(38.0);
                var east = Cesium.Math.toRadians(-72.0);
                var north = Cesium.Math.toRadians(42.0);

                // 1. Fly to a position with a top-down view
                viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0)
                });

                // 2. Fly to a Rectangle with a top-down view
                viewer.camera.flyTo({
                    destination : Cesium.Rectangle.fromDegrees(west, south, east, north)
                });

                // 3. Fly to a position with an orientation using unit vectors.
                viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(-122.19, 46.25, 5000.0),
                    orientation : {
                        direction : new Cesium.Cartesian3(-0.04231243104240401, -0.20123236049443421, -0.97862924300734),
                        up : new Cesium.Cartesian3(-0.47934589305293746, -0.8553216253114552, 0.1966022179118339)
                    }
                });

                // 4. Fly to a position with an orientation using heading, pitch and roll.
                viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(-122.19, 46.25, 5000.0),
                    orientation : {
                        heading : Cesium.Math.toRadians(175.0),
                        pitch : Cesium.Math.toRadians(-35.0),
                        roll : 0.0
                    }
                });
            },
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var camera = viewer.camera;

                console.log('camera position is ')
                console.log(camera.position);

                // 向量
                console.log('camera direction is')
                console.log(camera.direction)
                // 向量
                console.log('camera up is ')
                console.log(camera.up)
                console.log(camera.frustum.fov)
                console.log(camera.frustum.near)
                console.log(camera.frustum.far)






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
