<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>地形</a>

        <Drawer
                title="地形"
                v-model="value3"
                width="400"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">


                    <div id="zoomButtons"></div>
                    <div class="demo-container">
                        <label><input type="radio" name="shadingMaterials" value="none" data-bind="checked: selectedShading"> No shading</label>
                        <label><input type="radio" name="shadingMaterials" value="elevation" data-bind="checked: selectedShading"> Elevation</label>
                        <label><input type="radio" name="shadingMaterials" value="slope" data-bind="checked: selectedShading"> Slope</label>
                        <label><input type="radio" name="shadingMaterials" value="aspect" data-bind="checked: selectedShading"> Aspect</label>
                    </div>
                    <div class="demo-container">
                        <div>
                            <label><input type="checkbox" data-bind="checked: enableContour">Enable Contour Lines</label>
                        </div>
                        <div>
                            Spacing <input style="width: 136px" type="range" min="1.0" max="500.0" step="1.0" data-bind="value: contourSpacing, valueUpdate: 'input', enable: enableContour"> <span data-bind="text: contourSpacing"></span>m
                        </div>
                        <div>
                            Line Width <input style="width: 125px" type="range" min="1.0" max="10.0" step="1.0" data-bind="value: contourWidth, valueUpdate: 'input', enable: enableContour"> <span data-bind="text: contourWidth"></span>px
                        </div>
                        <div>
                            <button type="button" data-bind="click: changeColor, enable: enableContour">Change contour color</button>
                        </div>
                    </div>
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消地形</Button>
                <Button type="text" @click="submit">地形生效</Button>

                <Button type="text" @click="elevation">坡度地形渲染</Button>


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

                var terrainProvider = new Cesium.CesiumTerrainProvider({
                    url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles', // 默认立体地表
                    // 请求照明
                    requestVertexNormals: true,
                    // 请求水波纹效果
                    requestWaterMask: true
                });
                viewer.terrainProvider = terrainProvider;



            },


            cancel() {
//                this.value3 = false;
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;
                var cesiumTerrainProvider = Cesium.createWorldTerrain();
                var ellipsoidTerrainProvider = new Cesium.EllipsoidTerrainProvider();

                // 地形生效
//                viewer.scene.terrainProvider = cesiumTerrainProvider;
                // 地形平坦
                viewer.scene.terrainProvider = ellipsoidTerrainProvider;
            },
            elevation(){
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var viewer = new Cesium.Viewer('cesiumContainer', {
                    terrainProvider: Cesium.createWorldTerrain({
                        requestVertexNormals: true //Needed to visualize slope
                    })
                });
                viewer.scene.globe.enableLighting = true;


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
