<!-- model 模型 -->
<template>
    <div class="container">

        <div class="title">工作区间</div>
        <Tabs type="card" closable>

            <TabPane v-if="tabPaneShowState.isLayerControlShow" label="图层切换" >
                <layer-container></layer-container>
            </TabPane>

        </Tabs>
    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import LayerContainer from './tabbar/LayerContainer.vue'

    export default {
        data() {
            return {
                isLayerControlShow: true
            };
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
            LayerContainer

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

    .container{

        /*background: #3f3f3f;*/
        .title {
            /*background: #242424;*/
        }
    }

    .exist {

    }

    .not-exist {
        display: none;
    }


</style>
