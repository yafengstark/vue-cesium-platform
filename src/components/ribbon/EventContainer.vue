<!-- model 模型 -->
<template>
    <div class="container">

        <div class="functions">
            <draw-on-terrain></draw-on-terrain>
        </div>
        <div class="functions">
            <text-marker></text-marker>
        </div>
        <div class="functions">
            <!--<load3-d-tiles-bim></load3-d-tiles-bim>-->
            <map-pins></map-pins>
        </div>
        <div class="functions">
            <!--<load3-d-tiles-bim></load3-d-tiles-bim>-->
            <pick></pick>
        </div>
        <div class="functions">
            <!--<load3-d-tiles-bim></load3-d-tiles-bim>-->
            <point></point>
        </div>
        <div class="functions">
            <!--<load3-d-tiles-bim></load3-d-tiles-bim>-->
            <polygon-marker></polygon-marker>
        </div>
        <div class="functions">
            <!--<load3-d-tiles-bim></load3-d-tiles-bim>-->
            <polyline-marker></polyline-marker>
        </div>
        <div class="functions">
            <rectangle></rectangle>
        </div>



    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import DrawOnTerrain from '../subcomponents/DrawOnTerrain.vue'
    import TextMarker from '../subcomponents/TextMarker.vue'
    import MapPins from '../subcomponents/MapPins.vue'
    import Pick from '../subcomponents/Pick.vue'
    import Point from '../subcomponents/Point.vue'
    import PolygonMarker from '../subcomponents/PolygonMarker.vue'
    import PolylineMarker from '../subcomponents/PolylineMarker.vue'

    import Rectangle from '../subcomponents/Rectangle.vue'


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
            DrawOnTerrain,
            TextMarker,
            MapPins,
            Pick,
            Point,
            PolygonMarker,
            PolylineMarker,
            Rectangle,


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
