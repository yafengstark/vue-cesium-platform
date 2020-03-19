<!-- -->
<template>
    <div class="container">

        <!-- 工作区-->

        <label>工作区</label>
        <div v-if="isLayerControlShow">
            <layer-container></layer-container>
        </div>
        <div v-if="isBookmarkWorkspaceShow">
            <bookmark-container></bookmark-container>
        </div>
        <div v-if="isGraphicsWorkspaceShow">
            <graphics-container></graphics-container>
        </div>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import LayerContainer from './tabbar/LayerContainer.vue'
    import BookmarkContainer from './tabbar/BookmarkContainer.vue'
    import GraphicsContainer from './tabbar/GraphicsContainer.vue'

    export default {
        data() {
            return {
            };
        },
        computed: {
            ...mapState(['isLayerControlShow', 'isBookmarkWorkspaceShow','isGraphicsWorkspaceShow']),

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
            handleTabRemove (name) {
                // 手动关闭的标签页
                this['name'] = false;

            }
        },
        components: {
            // 注册子组件
            LayerContainer,
            BookmarkContainer,
            GraphicsContainer

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
