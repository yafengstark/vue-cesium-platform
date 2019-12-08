<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/book-mark.png" style="width: 32px">
            <br>书签</a>

        <Drawer
                title="书签"
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
                <Button type="primary" @click="submit">保存当前场景参数</Button>
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

                var camera = viewer.camera;

                console.log(camera.position);
                console.log(camera.direction)
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
