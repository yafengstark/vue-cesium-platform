<!-- model 模型 -->
<template>
    <div class="container">
        <div class="functions">
<!--快速跳转-->
            <fast-locate></fast-locate>
        </div>

        <div class="functions">

            <camera-tutorial></camera-tutorial>
        </div>
        <div class="functions">

            <terrain></terrain>
        </div>
        <div class="functions">

            <clock></clock>
        </div>
        <div class="functions">

            <camera></camera>
        </div>
        <div class="functions">

            <tile-coordinates></tile-coordinates>
        </div>



        <div class="functions">

            <simulate-fly></simulate-fly>
            <!--<tile-coordinates></tile-coordinates>-->
        </div>
        <div class="functions">
            <!--缩放-->
                <enlarge></enlarge>
        </div>
        <div class="functions">
            <!--缩放-->
            <scene-mode></scene-mode>
        </div>
        <div class="functions">
            <!---->
            <scene-mode></scene-mode>
        </div>
        <div class="functions">
            <Icon type="ios-expand" size="36"/>
            <br>
            全幅
        </div>
        <div class="functions">
            <Icon type="ios-eye" size="36"/>
            <br>
            鹰眼图
        </div>
        <div class="functions">
            <Icon type="ios-locate" size="36"/>
            <br>
            自动定位
        </div>

        <div class="functions">
            <meature></meature>
        </div>
        <div class="functions">
            <!--图层-->
            <layer></layer>
        </div>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import FastLocate from '../subcomponents/FastLocate.vue'
    import CameraTutorial from '../subcomponents/CameraTutorial.vue'
    import Terrain from '../subcomponents/Terrain.vue'
    import Clock from '../subcomponents/Clock.vue'
    import TileCoordinates from '../subcomponents/TileCoordinates.vue'
    import BookMark from '../subcomponents/BookMark.vue'
    import SimulateFly from '../subcomponents/SimulateFly.vue'
    import Enlarge from '../subcomponents/Enlarge.vue'
    import SceneMode from '../subcomponents/SceneMode.vue'
    import Meature from '../subcomponents/Meature.vue'
    import Layer from '../subcomponents/Layer.vue'
    import Camera from '../subcomponents/Camera.vue'
    import Heatmap from '../subcomponents/Heatmap.vue'
    import OdLine from '../subcomponents/OdLine.vue'




    export default {
        data() {
            return {};
        },
        computed: {
            ...mapState(['tabPaneShowState']),

        },
        created() {
            // 选择显示

        },
        methods: {
            async getlunbotu() {
                // 获取轮播图的方法
                const {data} = await this.$http.get("/getlunbo");
                if (data.status === 200) this.lunbotu = data.result;
            }
        },
        components: {
            // 注册子组件
            FastLocate,
            CameraTutorial,
            Terrain,
            Clock,
            TileCoordinates,
            BookMark,
            SimulateFly,
            Enlarge,
            SceneMode,
            Meature,
            Layer,
            Camera,
            Heatmap,
            OdLine

        }
    };
</script>

<style lang="scss" scoped>
    .layer {
        background-color: #f6f6f6;

        border-width: 0.001px;
        border-color: #e2e2e2;

        /*border: solid;*/
    }

    .container {
        display: flex;
        height: 78px;
        .functions {
            margin-left: 3px;
            /*border-style:solid;*/
            border-width: 1px;
            /*font-size: 20px;*/
            text-align: center;
        }

    }

    .exist {

    }

    .not-exist {
        display: none;
    }


</style>
