
<template>
    <div class="container">
        <!-- 插入 -->



        <div class="functions">
            <load-billboards></load-billboards>
        </div>
        <div class="functions">
            <load-box></load-box>

        </div>
        <div class="functions">
            <load-dynamic-line></load-dynamic-line>

        </div>
        <div class="functions">
            <load-czml></load-czml>
        </div>
        <div class="functions">
            <load-geojson></load-geojson>
        </div>

        <div class="functions">
            <load-html-element></load-html-element>
        </div>

        <div class="functions">
            <load-kml></load-kml>
        </div>

        <div class="functions">
            <entity></entity>
        </div>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import LoadBillboards from '../subcomponents/LoadBillboards.vue'
    import LoadBox from '../subcomponents/LoadBox.vue'
    import LoadDynamicLine from '../subcomponents/LoadDynamicLine.vue'
    import LoadCzml from '../subcomponents/LoadCzml.vue'
    import LoadGeojson from '../subcomponents/LoadGeojson.vue'
    import LoadHtmlElement from '../subcomponents/LoadHtmlElement.vue'
    import LoadKml from '../subcomponents/LoadKml.vue'

    import Entity from '../subcomponents/Entity.vue'

    import BookMark from '../subcomponents/BookMark.vue'

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
            LoadBillboards,
            LoadBox,
            LoadDynamicLine,
            LoadCzml,
            LoadGeojson,
            LoadHtmlElement,
            LoadKml,
            Entity

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

    .container{
        display: flex;
        height: 78px;
        .functions {
            margin-left:3px;
            /*border-style:solid;*/
            border-width:1px;
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
