<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>加载CZML</a>

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
                <Button type="text" @click="loadCzml">加载CZML文件</Button>
                <Button type="text" @click="loadCzml2">加载CZML文件-vihicle 运动</Button>
                <Button type="text" @click="loadCzmlBoard">加载CZML BillBoard</Button>
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
            loadCzml() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;



                viewer.dataSources.add(Cesium.CzmlDataSource.load('../../../lib/SampleData/simple.czml'));

                this.$store.state.myMap.viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 1500000)
                });


            },
            loadCzml2() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;



                viewer.dataSources.add(Cesium.CzmlDataSource.load('../../../lib/SampleData/Vehicle.czml'));

                viewer.scene.camera.setView({
                    destination:  Cesium.Cartesian3.fromDegrees(-116.52, 35.02, 95000),
                    orientation: {
                        heading: 6
                    }
                });

            },
            loadCzmlAir() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;



                viewer.dataSources.add(Cesium.CzmlDataSource.load('../../../lib/SampleData/Vehicle.czml'));

                viewer.scene.camera.setView({
                    destination:  Cesium.Cartesian3.fromDegrees(-116.52, 35.02, 95000),
                    orientation: {
                        heading: 6
                    }
                });

            },
            loadCzmlBoard() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var czml = [{
                    "id" : "document",
                    "name" : "Basic CZML billboard and label",
                    "version" : "1.0"
                }, {
                    "id" : "some-unique-id",
                    "name" : "AGI",
                    "description" : "<p><a href='http://www.agi.com' target='_blank'>Analytical Graphics, Inc.</a> (AGI) founded Cesium.</p>",
                    "billboard" : {
                        "image" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVDhPrZDRDcMgDAU9GqN0lIzijw6SUbJJygUeNQgSqepJTyHG91LVVpwDdfxM3T9TSl1EXZvDwii471fivK73cBFFQNTT/d2KoGpfGOpSIkhUpgUMxq9DFEsWv4IXhlyCnhBFnZcFEEuYqbiUlNwWgMTdrZ3JbQFoEVG53rd8ztG9aPJMnBUQf/VFraBJeWnLS0RfjbKyLJA8FkT5seDYS1Qwyv8t0B/5C2ZmH2/eTGNNBgMmAAAAAElFTkSuQmCC",
                        "scale" : 1.5
                    },
                    "label" : {
                        "fillColor" : {
                            "rgba" : [255, 255, 255, 255]
                        },
                        "font" : "12pt Lucida Console",
                        "horizontalOrigin" : "LEFT",
                        "pixelOffset" : {
                            "cartesian2" : [8, 0]
                        },
                        "style" : "FILL",
                        "text" : "AGI",
                        "showBackground" : true,
                        "backgroundColor" : {
                            "rgba" : [112, 89, 57, 200]
                        }
                    },
                    "position" : {
                        "cartesian":[
                            1216361.4096947117, -4736253.175342511, 4081267.4865667094
                        ]
                    }
                }];

                viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));

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
