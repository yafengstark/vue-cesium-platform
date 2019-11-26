<!-- model 模型 -->
<template>
    <div>

        <div @click="">

            <Icon type="md-albums" /> 图层切换
        </div>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件


    export default {
        data() {
            return {};
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
        computed: {

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

    .exist {

    }

    .not-exist {
        display: none;
    }


</style>
