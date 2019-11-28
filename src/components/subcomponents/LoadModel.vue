<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>加载模型</a>

        <Drawer
                title="加载模型"
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
                <Button type="primary" @click="submit">加载</Button>
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
            async submit() {
                this.createModel('../../../lib/SampleData/models/CesiumAir/Cesium_Air.glb', 5000.0);

            },

            createModel(url, height) {

                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                viewer.entities.removeAll();

                var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
                var heading = Cesium.Math.toRadians(135);
                var pitch = 0;
                var roll = 0;
                var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

                var entity = viewer.entities.add({
                    name: url,
                    position: position,
                    orientation: orientation,
                    model: {
                        uri: url,
                        minimumPixelSize: 128,
                        maximumScale: 20000
                    }
                });
                viewer.trackedEntity = entity;
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
