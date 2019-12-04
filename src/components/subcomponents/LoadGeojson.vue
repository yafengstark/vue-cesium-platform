<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>加载Geojson</a>

        <Drawer
                title="加载Geojson topojson"
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
                <Button type="text" @click="submit">加载默认样式</Button>
                <Button type="text" @click="submit2">加载基本样式</Button>
                <Button type="text" @click="submit3">加载条件样式</Button>
                <Button type="text" @click="submit4">加载geojson simplestyle</Button>
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

                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../../lib/SampleData/ne_10m_us_states.topojson'));


            },
            submit2() {
                //Example 2: Load with basic styling options.
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../../lib/SampleData/ne_10m_us_states.topojson', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK.withAlpha(0.5),
                    strokeWidth: 3
                }));

            },
            submit3() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                Cesium.Math.setRandomNumberSeed(0);

                //Example 3: Apply custom graphics after load.
                var promise = Cesium.GeoJsonDataSource.load('../../../lib/SampleData/ne_10m_us_states.topojson');
                promise.then(function(dataSource) {
                    viewer.dataSources.add(dataSource);

                    //Get the array of entities
                    var entities = dataSource.entities.values;

                    var colorHash = {};
                    for (var i = 0; i < entities.length; i++) {
                        //For each entity, create a random color based on the state name.
                        //Some states have multiple entities, so we store the color in a
                        //hash so that we use the same color for the entire state.
                        var entity = entities[i];
                        var name = entity.name;
                        var color = colorHash[name];
                        if (!color) {
                            color = Cesium.Color.fromRandom({
                                alpha : 1.0
                            });
                            colorHash[name] = color;
                        }

                        //Set the polygon material to our random color.
                        entity.polygon.material = color;
                        //Remove the outlines.
                        entity.polygon.outline = false;

                        //Extrude the polygon based on the state's population.  Each entity
                        //stores the properties for the GeoJSON feature it was created from
                        //Since the population is a huge number, we divide by 50.
                        entity.polygon.extrudedHeight = entity.properties.Population / 50.0;
                    }
                }).otherwise(function(error){
                    //Display any errrors encountered while loading.
                    window.alert(error);
                });
            },
            submit4() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var dataSource = Cesium.GeoJsonDataSource.load('../../../lib/SampleData/simplestyles.geojson');
                viewer.dataSources.add(dataSource);
                viewer.zoomTo(dataSource);
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
