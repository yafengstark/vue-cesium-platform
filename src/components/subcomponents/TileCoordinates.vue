<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>瓦片网格</a>

        <Drawer
                title="瓦片网格"
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
                <Button style="margin-right: 8px" @click="cancel">移除</Button>
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
                imageryLayer: null
            };
        },
        computed: {
            ...mapState(['myMap']),
        },
        created() {


        },
        mounted() {

        },
        methods: {
            async getlunbotu() {

            },
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;


                var imageryLayers = viewer.imageryLayers;



                this.imageryLayer = viewer.imageryLayers.addImageryProvider(new Cesium.TileCoordinatesImageryProvider());


            },

            cancel() {

                // TODO: 取消的bug吗
                this.$Message.info('移除');
                var viewer = this.myMap.viewer;
                console.log(viewer.imageryLayers.remove(this.imageryLayer));


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
