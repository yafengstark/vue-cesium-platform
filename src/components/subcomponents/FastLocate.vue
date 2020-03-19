<template>
    <div class="container">



        <Button @click="value3 = true">
            <img src="../../common/images/locate.png" style="width: 16px">快速跳转
        </Button>

        <Drawer
                title="位置"
                v-model="value3"
                width="200"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">

                    <Col span="12">
                    <FormItem label="位置" label-position="top">
                        <br>
                        <Input class="input" v-model="location"
                                                 placeholder="120 31 15000" style="width: 300px"/>


                    </FormItem>
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消</Button>
                <Button type="primary" @click="submit">跳转</Button>
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
                location: ''

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

                let lat = 0;
                let lon = 0;
                let height = 0;

                var result = this.location.trim().split(/\s+/);
                if(result.length === 3){
                    lon = parseFloat(result[0]);
                    lat = parseFloat(result[1]);
                    height = parseFloat(result[2])


                }else if(result.length === 2){
                    lon = parseFloat(result[0]);
                    lat = parseFloat(result[1]);
                    height = 150000
                }else{
                    this.$Message.error("输入有误")
                }


                this.$store.state.myMap.viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(lon, lat, height)
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
