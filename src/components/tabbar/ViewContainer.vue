<template>
    <div class="layer" :class="[ message ? 'exist' : 'not-exist' ]">
        <!--  头部区域 -->
        <handle-header title="视角"></handle-header>



        <!--<Row class="layer-header">-->
        <!---->
        <!--<Col span="12"> <h1>图层管理</h1></Col>-->
        <!--<Col span="12"><Button type="text">X</Button></Col>-->
        <!--</Row>-->


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import handleHeader from "../subcomponents/HandleHeader.vue"

    export default {
        data() {
            return {
            };
        },
        created() {
            //  关闭上一个
            this.$store.commit("setIsHandleShow", false);
            // 打开这一个
            this.$store.commit("setIsHandleShow", true);
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
            handleHeader

        },
        computed: {
            message() {
                return this.$store.state.isHandleShow
            }
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
