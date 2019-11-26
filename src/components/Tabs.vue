<!-- model 模型 -->
<template>
    <div>

        <Tabs type="card">

            <TabPane v-if="isLayerControlShow" label="图层切换">图层控制</TabPane>

        </Tabs>
    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件


    export default {
        data() {
            return {
                isLayerControlShow: true
            };
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


        },
        computed: {}
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
