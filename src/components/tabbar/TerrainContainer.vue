<template>
    <div class="layer" :class="[ message ? 'exist' : 'not-exist' ]">
        <!--  头部区域 -->
        <handle-header title="地形"></handle-header>



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

                data2: [
                    {
                        title: '基础影像',
                        expand: false,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '地形',
                        expand: false,
                        children: []
                    },
                    {
                        title: '叠加图层',
                        expand: false,
                        children: []
                    },
                    {
                        title: '标注图层',
                        expand: false,
                        children: []
                    }
                ]


            };
        },
        created() {
            // 选择显示
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
