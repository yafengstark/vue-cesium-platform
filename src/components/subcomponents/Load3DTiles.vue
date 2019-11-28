<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>加载3D Tiles</a>

        <Drawer
                title="加载3D tiles"
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
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url : '../../../lib/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json'
                }));
//                /tileset.json
//                this.$store.state.myMap.viewer.camera.flyTo({
//                    destination : Cesium.Cartesian3.fromDegrees( -1.319719,  0.698848, 5000)
//                });
                tileset.loadProgress.addEventListener(function(numberOfPendingRequests, numberOfTilesProcessing) {
                    if ((numberOfPendingRequests === 0) && (numberOfTilesProcessing === 0)) {
                        console.log('Stopped loading');
                        return;
                    }

                    console.log('Loading: requests: ' + numberOfPendingRequests + ', processing: ' + numberOfTilesProcessing);
                });

                // 加载成功后会执行
                tileset.readyPromise.then(function(tileset) {
                    console.log('成功加载---')
                    console.log(tileset)
//                    this.$Message.info('成功加载');

                    var boundingSphere = tileset.boundingSphere;
                    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius * 2));
                    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
                }).otherwise(function(error) {
                    throw(error);
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
