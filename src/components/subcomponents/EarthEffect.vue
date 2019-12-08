<template>
    <div class="container">


        <a @click="value3 = true">
            <img src="../../common/images/night_landscape.png" style="width: 32px">
            <br>地图效果</a>

        <Drawer
                title="时钟"
                v-model="value3"
                width="400"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">


                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消光效</Button>
                <Button type="primary" @click="submit">启动光效</Button>
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



                // 光效
                viewer.scene.globe.enableLighting = true;



            },


            cancel() {
                this.$Message.info('试图取消');
                //
                var viewer = this.myMap.viewer;
                // 光效
                viewer.scene.globe.enableLighting = false;
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
