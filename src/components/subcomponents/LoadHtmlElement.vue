<template>
    <div class="container">

        <!-- 将html元素贴到地球上 -->

        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>html元素</a>

        <img id="htmlOverlay" style="position: absolute" src="../../../lib/images/Cesium_Logo_overlay.png">

        <Drawer
                title="加载"
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
        mounted(){
            var htmlOverlay = document.getElementById('htmlOverlay');
            htmlOverlay.style.visibility = 'hidden';
        },
        methods: {
            async getlunbotu() {

            },
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var htmlOverlay = document.getElementById('htmlOverlay');
                var scratch = new Cesium.Cartesian2();
                viewer.scene.preRender.addEventListener(function() {
                    var position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
                    var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
                    if (Cesium.defined(canvasPosition)) {
                        htmlOverlay.style.position = 'absolute';
                        htmlOverlay.style.visibility = 'visible';
                        htmlOverlay.style.top = canvasPosition.y + 'px';
                        htmlOverlay.style.left = canvasPosition.x + 'px';
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
