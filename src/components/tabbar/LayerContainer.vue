<template>
    <div>

        <Button @click="hideIt">隐藏</Button>
        <Card dis-hover v-for="(item, index) in layerList" :key="index">

            <p>
                名称: {{item.name}}
            </p>

            <i-switch v-model="item.show" @on-change="changeShow(item)"/>
        </Card>


        <Button @click="loadModel">加载模型</Button>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'


    import ISwitch from "../../../node_modules/iview/src/components/switch/switch.vue";

    export default {
        data() {
            return {
                layerList: [
                    {name: '必应地图', show: false,}
                ]

            };
        },
        computed: {
            ...mapState(['isLayerControlShow']),

        },
        created() {
            // 选择显示

        },
        methods: {
            loadModel() {
                var Cesium = this.$store.state.Cesium;
                var viewer = this.$store.state.viewer;
                var that = this;


                var url = '';

                console.log('模型url')
                console.log(url)
                url = '/lib/model.gltf';
                console.log('替换后的url: ' + url)

                var lat = 31;
                var lon = 120.1;
                var position = Cesium.Cartesian3.fromDegrees(lon, lat, 100);
                var heading = Cesium.Math.toRadians(135);
                var pitch = 0;
                var roll = 0;
                var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);


                var entity = viewer.entities.add({
                    name: 'test',
                    position: position,
                    orientation: orientation,
                    model: {
                        uri: url,
                        minimumPixelSize: 1280000,
                        maximumScale: 100,
                        luminanceAtZenith: 1,
                        scale: 10,
//                        minimumPixelSize : 128,
//                        maximumScale : 20000,
//                        color : getColor(viewModel.color, viewModel.alpha),
                        color: Cesium.Color.RED.withAlpha(0.9)
                    }
                });

//                viewer.camera.setView({
//                    destination: Cesium.Cartesian3.fromDegrees(lon, lat, 100)
//                });

                viewer.trackedEntity = entity;
                console.log('加载结束')

            },
            async getlunbotu() {
                // 获取轮播图的方法
                const {data} = await this.$http.get("/getlunbo");
                if (data.status === 200) this.lunbotu = data.result;
            },
            changeShow(layer) {
                console.log(layer);
            },
            hideIt() {

                console.log('点击了隐藏')

                this.$store.commit('setIsLayerControlViz', {show: false});


            }
        },
        components: {
            ISwitch
            // 注册子组件


        },

    };
</script>

<style lang="scss" scoped>
    .layer {
        background-color: #f6f6f6;
        border-width: 0.001px;
        border-color: #e2e2e2;
        /*border: solid;*/
    }

    .exist {

    }

    .not-exist {
        display: none;
    }


</style>
