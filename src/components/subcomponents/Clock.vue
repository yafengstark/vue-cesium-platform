<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>时钟</a>

        <Drawer
                title="地形"
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

                var clock = new Cesium.Clock({
                    startTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
                    currentTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
                    stopTime : Cesium.JulianDate.fromIso8601("2013-12-26"),
                    clockRange : Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
                    clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
                    multiplier : 4000 // how much time to advance each tick
                });

                var resetTime = Cesium.JulianDate.fromIso8601("2013-12-25");
                viewer.clockViewModel.currentTime = resetTime;
                viewer.timeline.updateFromClock();

//                viewer.clockViewModel.clock =clock;

                viewer.scene.globe.enableLighting = true;



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
