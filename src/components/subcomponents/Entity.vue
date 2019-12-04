<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>Entity</a>

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
                <Button type="primary" @click="submit">初始化</Button>
                <Button style="margin-right: 8px" @click="cancel">切换显示隐藏</Button>
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
                boxes: undefined


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

                var entities = viewer.entities;

//Create Entity "folders" to allow us to turn on/off entities as a group.
                var spheres = entities.add(new Cesium.Entity());
                this.boxes = entities.add(new Cesium.Entity());
                var boxes = this.boxes
                var ellipsoids = entities.add(new Cesium.Entity());

//Create the entities and assign each entity's parent to the group to which it belongs.
                for (var i = 0; i < 5; ++i) {
                    var height = 100000.0 + (200000.0 * i);
                    entities.add({
                        parent : boxes,
                        position : Cesium.Cartesian3.fromDegrees(-106.0, 45.0, height),
                        box : {
                            dimensions : new Cesium.Cartesian3(90000.0, 90000.0, 90000.0),
                            material : Cesium.Color.fromRandom({alpha : 1.0})
                        }
                    });

                    entities.add({
                        parent : ellipsoids,
                        position : Cesium.Cartesian3.fromDegrees(-102.0, 45.0, height),
                        ellipsoid : {
                            radii : new Cesium.Cartesian3(45000.0, 45000.0, 90000.0),
                            material : Cesium.Color.fromRandom({alpha : 1.0})
                        }
                    });

                    entities.add({
                        parent : spheres,
                        position : Cesium.Cartesian3.fromDegrees(-98.0, 45.0, height),
                        ellipsoid : {
                            radii : new Cesium.Cartesian3(67500.0, 67500.0, 67500.0),
                            material : Cesium.Color.fromRandom({alpha : 1.0})
                        }
                    });
                }

                viewer.zoomTo(viewer.entities);


            },


            cancel() {
                var boxes = this.boxes;

                boxes.show = !boxes.show;
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
