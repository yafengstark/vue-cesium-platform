<!-- model 模型 -->
<template>
    <div class="container">

        <!-- 视图 -->
        <div class="functions">
            <Button @click="showLayer">图层</Button>
        </div>
        <div class="functions">
            <Button @click="showBookmark">书签</Button>
        </div>
        <div class="functions">
            <Button @click="showGrapics">标注</Button>
        </div>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import LoadModel from '../subcomponents/LoadModel.vue'
    import Load3DTiles from '../subcomponents/Load3DTiles.vue'
    import Load3DTilesBim from '../subcomponents/Load3DTilesBim.vue'
    export default {
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'isLayerControlShow',
                'isBookmarkWorkspaceShow'
            ]),

        },
        created() {
            // 选择显示

        },
        methods: {
            async getlunbotu() {
                // 获取轮播图的方法
                const {data} = await this.$http.get("/getlunbo");
                if (data.status === 200) this.lunbotu = data.result;
            },
            showLayer(){
                this.$store.commit('setIsLayerControlViz', {show: true});
            },
            showBookmark(){
                this.$store.commit('setBookmarkWorkspaceViz', {show: true});
                console.log('设置书签显示成功')
            },
            showGrapics(){
                this.$store.commit('setGraphicsWorkspaceViz', {show: true});
                console.log('设置显示成功')
            }
        },
        components: {
            // 注册子组件
            LoadModel,
            Load3DTiles,
            Load3DTilesBim

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
