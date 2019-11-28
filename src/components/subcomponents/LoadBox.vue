<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>加载Box</a>

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
        methods: {
            async getlunbotu() {

            },
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var blueBox = viewer.entities.add({
                    name : 'Blue box',
                    position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
                    box : {
                        dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
                        material : Cesium.Color.BLUE
                    }
                });

                this.$store.state.myMap.viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 1500000)
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
